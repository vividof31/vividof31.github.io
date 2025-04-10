import React, { useState, FormEvent, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';
import PhoneInput, { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const countryOptions = getCountries().map((code) => ({
  code,
  name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code,
}));

function CustomPhoneInput(props: any) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
    />
  );
}

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  // State for all form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [preferredContact, setPreferredContact] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState<string | undefined>(undefined);
  const [usePhoneForWhatsapp, setUsePhoneForWhatsapp] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [hasOfAccount, setHasOfAccount] = useState<boolean | null>(null);
  const [isOfVerified, setIsOfVerified] = useState<boolean | null>(null);
  const [hasVerifiedPayment, setHasVerifiedPayment] = useState<boolean | null>(null);
  const [earningsLast30Days, setEarningsLast30Days] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorDetails, setSubmitErrorDetails] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Reset form function
  const resetForm = () => {
    setFullName(''); setEmail(''); setPhoneNumber(''); setPreferredContact('');
    setWhatsappNumber(''); setUsePhoneForWhatsapp(false); setTelegramUsername('');
    setAge(''); setCountryOrigin(''); setPrimaryLanguage('');
    setHasOfAccount(null); setIsOfVerified(null); setHasVerifiedPayment(null);
    setEarningsLast30Days(''); setWhyJoin(''); setAgeConfirmed(false);
    setSelectedFiles([]); setFileError(null);
    setSubmitStatus('idle'); setSubmitErrorDetails(null); setUploadProgress(null);
  };

  // Handler for removing a selected file
  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    if (updatedFiles.length < 5) {
      setFileError(t('fileValidationError', `Please select at least 5 images (${updatedFiles.length} selected).`));
    } else {
      setFileError(null);
    }
  };

  // Toggle function for WhatsApp number
  const toggleUsePhoneForWhatsapp = () => {
    const newValue = !usePhoneForWhatsapp;
    setUsePhoneForWhatsapp(newValue);
    if (newValue) setWhatsappNumber(phoneNumber);
  };

  // Handler for file input changes (cumulative)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles && newFiles.length > 0) {
      const updatedFiles = [...selectedFiles, ...Array.from(newFiles)];
      setSelectedFiles(updatedFiles);
      if (updatedFiles.length < 5) {
        setFileError(t('fileValidationError', `Please select at least 5 images (${updatedFiles.length} selected).`));
      } else {
        setFileError(null);
      }
    }
    event.target.value = ''; // Allow re-selecting same file
  };

  // Main submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitErrorDetails(null);
    setFileError(null); // Clear file error on new submit attempt

    // --- Validations ---
    let validationErrors: string[] = [];
    // Temporarily disable HTML5 required, rely on JS validation below
    // if (!ageConfirmed) { validationErrors.push(t('ageConfirmError', 'You must confirm you are over 18.')); }
    
    if (selectedFiles.length < 5) {
      const msg = t('fileValidationError', `Please select at least 5 images (${selectedFiles.length} selected).`);
      setFileError(msg); validationErrors.push(msg); 
    } else { setFileError(null); }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { validationErrors.push(t('emailValidationError', 'Please enter a valid email address.')); }
    const phoneRegex = /^[+\-\(\)\s\d]+$/;
    // if (phoneNumber && !phoneRegex.test(phoneNumber)) { validationErrors.push(t('phoneValidationError', 'Please enter a valid phone number format.')); }
    // if (preferredContact === 'WhatsApp' && !usePhoneForWhatsapp && whatsappNumber && !phoneRegex.test(whatsappNumber)) { validationErrors.push(t('whatsappValidationError', 'Please enter a valid WhatsApp number format.')); }
    // if (preferredContact === 'Telegram' && telegramUsername && /\s/.test(telegramUsername)) { validationErrors.push(t('telegramValidationError', 'Telegram username cannot contain spaces.')); }
    // if (!countryOrigin) { validationErrors.push('Country of Origin is required.'); }
    // if (!primaryLanguage) { validationErrors.push('Primary Language is required.'); }


    if (hasOfAccount === null) { validationErrors.push(t('hasOfAccountError', 'Please specify if you have an OnlyFans account.')); } 
    else if (hasOfAccount === true) {
      if (isOfVerified === null) { validationErrors.push(t('isOfVerifiedError', 'Please specify if your OnlyFans account is verified.')); } 
      else if (isOfVerified === true && hasVerifiedPayment === null) { validationErrors.push(t('hasVerifiedPaymentError', 'Please specify if you have verified a payment method.')); }
    }
    
    if (validationErrors.length > 0) {
      setSubmitErrorDetails(validationErrors.join(' '));
      setSubmitStatus('error'); return; 
    }
    // --- End Validations ---

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setUploadProgress(t('uploadStarting', 'Starting upload...'));

    // File Upload Logic
    const uploadedFileUrls: string[] = [];
    let fileUploadError = false;
    const timestamp = Date.now();
    const totalFilesToUpload = selectedFiles.length;

    for (let i = 0; i < totalFilesToUpload; i++) {
      setUploadProgress(t('uploadProgressMsg', `Uploading image ${i + 1} of ${totalFilesToUpload}...`));
      const file = selectedFiles[i];
      if (!file.type.startsWith('image/')) { console.warn(`Skipping non-image file: ${file.name}`); continue; }

      const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
      const filePath = `public/${sanitizedEmail}_${timestamp}_${file.name}`;

      try {
        const { error: uploadError } = await supabase.storage.from('applicant-photos').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('applicant-photos').getPublicUrl(filePath);
        if (urlData?.publicUrl) uploadedFileUrls.push(urlData.publicUrl);
        else console.warn(`Could not get public URL for ${filePath}`);
      } catch (uploadError: any) {
        console.error(`Error uploading file ${file.name}:`, uploadError);
        setSubmitErrorDetails(t('uploadFileError', `Failed to upload file: ${file.name}.`) + ` ${uploadError.message || ''}`);
        fileUploadError = true; break;
      }
    }

    if (fileUploadError) {
      setSubmitStatus('error'); setIsSubmitting(false); setUploadProgress(null); return;
    }
    setUploadProgress(t('uploadFinishing', 'Finishing submission...'));

    // Database Insert Logic
    try {
      const submissionData = {
        full_name: fullName, email: email, phone_number: phoneNumber || null,
        preferred_contact_method: preferredContact || null,
        whatsapp_number: preferredContact === 'WhatsApp' ? (usePhoneForWhatsapp ? phoneNumber || null : whatsappNumber || null) : null,
        telegram_username: preferredContact === 'Telegram' ? telegramUsername || null : null,
        age: age === '' ? null : age, country_origin: countryOrigin || null, primary_language: primaryLanguage || null,
        has_of_account: hasOfAccount, is_of_verified: isOfVerified, has_verified_payment: hasVerifiedPayment,
        earnings_last_30_days: (hasOfAccount && isOfVerified) ? earningsLast30Days || null : null, 
        why_join: whyJoin, age_confirmed: ageConfirmed,
        image_urls: uploadedFileUrls.length > 0 ? uploadedFileUrls : null,
      };
      console.log('Submitting data to Supabase:', submissionData);
      const { error } = await supabase.from('submissions').insert([submissionData]);
      if (error) throw error;
      console.log('Supabase insert successful');
      setSubmitStatus('success');
    } catch (error: any) {
      console.error('Error submitting to Supabase:', error);
      setSubmitErrorDetails(error.message || t('unknownSubmitError', 'An unknown error occurred.'));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  if (!isOpen) return null;

  const inputBaseClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white";
  const labelBaseClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const requiredMark = <span className="text-red-500">*</span>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
<div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-300/20 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('applyModalTitle')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Close modal"><X className="h-6 w-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate> {/* Added noValidate */}
          {submitStatus === 'success' ? (
            <div className="text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">{t('submissionSuccess')}</div>
          ) : (
            <>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label htmlFor="fullName" className={labelBaseClass}>{t('fullNameLabel')} {requiredMark}</label><input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputBaseClass} /></div>
                <div><label htmlFor="email" className={labelBaseClass}>{t('emailLabel')} {requiredMark}</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBaseClass} /></div>
                <div>
                  <label htmlFor="phoneNumber" className={labelBaseClass}>{t('phoneNumberLabel')} {requiredMark}</label>
                  <PhoneInput
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    defaultCountry="US"
                    className="w-full"
                    inputComponent={CustomPhoneInput}
                  />
                </div>
                <div><label htmlFor="age" className={labelBaseClass}>{t('ageLabel')} {requiredMark}</label><input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))} min="18" inputMode="numeric" pattern="\d*" className={inputBaseClass} onKeyDown={(e) => {
                  if (
                    !(
                      (e.key >= '0' && e.key <= '9') ||
                      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                    )
                  ) {
                    e.preventDefault();
                  }
                }} /></div>
                <div>
                  <label htmlFor="countryOrigin" className={labelBaseClass}>{t('countryOriginLabel')} {requiredMark}</label>
                  <select
                    id="countryOrigin"
                    value={countryOrigin}
                    onChange={(e) => setCountryOrigin(e.target.value)}
                    className={inputBaseClass}
                  >
                    <option value="" disabled>Select your country</option>
                    {countryOptions.map((c) => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="primaryLanguage" className={labelBaseClass}>{t('primaryLanguageLabel')} {requiredMark}</label>
                  <select
                    id="primaryLanguage"
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    className={inputBaseClass}
                  >
                    <option value="" disabled>Select language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Italian">Italian</option>
                    <option value="Russian">Russian</option>
                    <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="Thai">Thai</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Polish">Polish</option>
                    <option value="Ukrainian">Ukrainian</option>
                    <option value="Hebrew">Hebrew</option>
                    <option value="Greek">Greek</option>
                    <option value="Hungarian">Hungarian</option>
                    <option value="Czech">Czech</option>
                    <option value="Danish">Danish</option>
                    <option value="Finnish">Finnish</option>
                    <option value="Swedish">Swedish</option>
                    <option value="Norwegian">Norwegian</option>
                    <option value="Malay">Malay</option>
                    <option value="Filipino (Tagalog)">Filipino (Tagalog)</option>
                    <option value="Romanian">Romanian</option>
                    <option value="Bulgarian">Bulgarian</option>
                    <option value="Serbian">Serbian</option>
                    <option value="Croatian">Croatian</option>
                    <option value="Slovak">Slovak</option>
                    <option value="Lithuanian">Lithuanian</option>
                    <option value="Latvian">Latvian</option>
                    <option value="Estonian">Estonian</option>
                    <option value="Swahili">Swahili</option>
                    <option value="Afrikaans">Afrikaans</option>
                    <option value="Zulu">Zulu</option>
                    <option value="Xhosa">Xhosa</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Farsi (Persian)">Farsi (Persian)</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Khmer">Khmer</option>
                    <option value="Lao">Lao</option>
                    <option value="Burmese">Burmese</option>
                    <option value="Nepali">Nepali</option>
                    <option value="Pashto">Pashto</option>
                    <option value="Somali">Somali</option>
                    <option value="Amharic">Amharic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Contact Preference */}
              <div>
                <label className={labelBaseClass}>{t('preferredContactLabel')} {requiredMark}</label>
                <select value={preferredContact} onChange={(e) => setPreferredContact(e.target.value)} className={inputBaseClass}>
                  <option value="" disabled>{t('selectPlaceholder', 'Select...')}</option>
                  <option value="Telegram">Telegram</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
              {preferredContact === 'WhatsApp' && (
                <div className="space-y-1"><div className="flex justify-between items-center mb-1"><label htmlFor="whatsappNumber" className={labelBaseClass}>{t('whatsappLabel')} {requiredMark}</label><button type="button" onClick={toggleUsePhoneForWhatsapp} className={`px-3 py-1 border rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${usePhoneForWhatsapp ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}>{usePhoneForWhatsapp ? t('enterDifferentWhatsApp') : t('sameAsPhone')}</button></div>{!usePhoneForWhatsapp && (<input type="tel" id="whatsappNumber" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} required={!usePhoneForWhatsapp} className={inputBaseClass} />)}</div>
              )}
              {preferredContact === 'Telegram' && (
                <div><label htmlFor="telegramUsername" className={labelBaseClass}>{t('telegramLabel')} {requiredMark}</label><input type="text" id="telegramUsername" value={telegramUsername} onChange={(e) => setTelegramUsername(e.target.value)} className={inputBaseClass} /></div>
              )}

              {/* OnlyFans Details */}
              <div className="space-y-2">
                <fieldset><legend className={labelBaseClass}>{t('hasOfAccountLabel')} {requiredMark}</legend><div className="flex items-center space-x-4"><label className="flex items-center"><input type="radio" name="hasOfAccount" value="yes" checked={hasOfAccount === true} onChange={() => setHasOfAccount(true)} className="mr-1" /> {t('yes')}</label><label className="flex items-center"><input type="radio" name="hasOfAccount" value="no" checked={hasOfAccount === false} onChange={() => setHasOfAccount(false)} className="mr-1" /> {t('no')}</label></div></fieldset>
                {hasOfAccount === true && (
                  <div className="space-y-2">
                    <fieldset><legend className={labelBaseClass}>{t('isOfVerifiedLabel')} {requiredMark}</legend><div className="flex items-center space-x-4"><label className="flex items-center"><input type="radio" name="isOfVerified" value="yes" checked={isOfVerified === true} onChange={() => setIsOfVerified(true)} className="mr-1" /> {t('yes')}</label><label className="flex items-center"><input type="radio" name="isOfVerified" value="no" checked={isOfVerified === false} onChange={() => setIsOfVerified(false)} className="mr-1" /> {t('no')}</label></div></fieldset>
                    {isOfVerified === true && (
                      <div className="space-y-2">
                        <fieldset><legend className={labelBaseClass}>{t('hasVerifiedPaymentLabel')} {requiredMark}</legend><div className="flex items-center space-x-4"><label className="flex items-center"><input type="radio" name="hasVerifiedPayment" value="yes" checked={hasVerifiedPayment === true} onChange={() => setHasVerifiedPayment(true)} className="mr-1" /> {t('yes')}</label><label className="flex items-center"><input type="radio" name="hasVerifiedPayment" value="no" checked={hasVerifiedPayment === false} onChange={() => setHasVerifiedPayment(false)} className="mr-1" /> {t('no')}</label></div></fieldset>
                        <div><label htmlFor="earningsLast30Days" className={labelBaseClass}>{t('earningsLabel')}</label><input type="text" id="earningsLast30Days" value={earningsLast30Days} onChange={(e) => setEarningsLast30Days(e.target.value)} className={inputBaseClass} placeholder="e.g., $1,000" /></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className={labelBaseClass}>{t('uploadFilesLabel')} {requiredMark}</label>
                <input type="file" id="files" multiple accept="image/*" onChange={handleFileChange} className="sr-only" /> {/* Removed required */}
                <label htmlFor="files" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Browse Files...</label>
                {fileError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fileError}</p>}
                {selectedFiles.length > 0 && (<p className={`mt-1 text-sm ${fileError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{selectedFiles.length} image(s) selected. {selectedFiles.length < 5 ? '(Need ' + (5 - selectedFiles.length) + ' more)' : ''}</p>)}
                {selectedFiles.length > 0 && (<ul className="list-disc list-inside mt-2 space-y-1 max-h-32 overflow-y-auto">{selectedFiles.map((file, index) => (<li key={index} className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400"><span className="truncate" title={file.name}>{file.name}</span><button type="button" onClick={() => handleRemoveFile(index)} className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400" aria-label={`Remove ${file.name}`}><X size={14} /></button></li>))}</ul>)}
              </div>

              {/* Reason & Confirmation */}
              <div><label htmlFor="whyJoin" className={labelBaseClass}>{t('whyJoinLabel')} {requiredMark}</label><textarea id="whyJoin" rows={4} value={whyJoin} onChange={(e) => setWhyJoin(e.target.value)} className={inputBaseClass}></textarea></div> {/* Removed required */}
              <div className="flex items-start"><input type="checkbox" id="ageConfirmed" checked={ageConfirmed} onChange={(e) => setAgeConfirmed(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 mr-2 focus:ring-blue-500" /> {/* Removed required */} <label htmlFor="ageConfirmed" className="text-sm text-gray-700 dark:text-gray-300">{t('ageConfirmLabel')} {requiredMark}</label></div>

              {/* Error Display */}
              {submitStatus === 'error' && (<div className="text-sm text-red-600 dark:text-red-400">{submitErrorDetails}</div>)}

              {/* Buttons and Progress */}
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">{t('cancel')}</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center">
                  {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{t('submitting')}</>) : (t('submit'))}
                </button>
              </div>
              {isSubmitting && uploadProgress && (<p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">{uploadProgress}</p>)}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
