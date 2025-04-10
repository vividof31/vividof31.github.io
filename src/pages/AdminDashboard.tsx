import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define a type for the submission data structure
interface Submission {
  id: number;
  created_at: string; // Assuming Supabase adds this automatically
  full_name: string;
  email: string;
  phone_number?: string;
  preferred_contact_method?: string;
  whatsapp_number?: string;
  telegram_username?: string;
  age?: number;
  country_origin?: string;
  primary_language?: string;
  has_of_account?: boolean;
  is_of_verified?: boolean;
  has_verified_payment?: boolean;
  earnings_last_30_days?: string;
  why_join?: string;
  age_confirmed?: boolean;
  image_urls?: string[];

  // New onboarding fields
  smartphone_model?: string;
  compensation_offer?: string;
  daily_availability_hours?: number;
  english_skill_level?: number;
  explicit_content_details?: string;
  start_availability?: string;
  blocked_countries?: string;
  contract_signed?: boolean;
  equipment_ready?: boolean;
  admin_notes?: string;
}

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageIndices, setImageIndices] = useState<{ [submissionId: number]: number }>({});
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[] | null>(null);
  const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);

  // Onboarding form states
  const [smartphoneModel, setSmartphoneModel] = useState('');
  const [compensationOffer, setCompensationOffer] = useState('');
  const [dailyAvailabilityHours, setDailyAvailabilityHours] = useState<number | ''>('');
  const [englishSkillLevel, setEnglishSkillLevel] = useState<number | ''>('');
  const [explicitContentDetails, setExplicitContentDetails] = useState('');
  const [startAvailability, setStartAvailability] = useState('');
  const [blockedCountries, setBlockedCountries] = useState('');
  const [contractReady, setContractReady] = useState(false);
  const [equipmentReady, setEquipmentReady] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    // Redirect to login if auth is loaded and no user session exists
    if (!authLoading && !user) {
      navigate('/admin');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    // Fetch submissions only if user is logged in
    if (user) {
      const fetchSubmissions = async () => {
        setLoading(true);
        setError(null);
        try {
          // IMPORTANT: Ensure RLS policy allows logged-in admins to read 'submissions' table
          const { data, error } = await supabase
            .from('submissions')
            .select('*')
            .order('created_at', { ascending: false }); // Order by newest first

          if (error) throw error;
          setSubmissions(data || []);
        } catch (err: any) {
          console.error("Error fetching submissions:", err);
          setError(err.message || "Failed to fetch submissions. Check RLS policies.");
        } finally {
          setLoading(false);
        }
      };
      fetchSubmissions();
    }
  }, [user]); // Re-fetch if user changes

  const handleSignOut = async () => {
    await signOut();
    // navigate('/admin/login'); // Auth listener should handle redirect
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImages || selectedImageIndex === null) return;

      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(
          (prev) =>
            prev !== null
              ? (prev - 1 + activeImages.length) % activeImages.length
              : 0
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(
          (prev) =>
            prev !== null
              ? (prev + 1) % activeImages.length
              : 0
        );
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImages, selectedImageIndex]);

  // Show loading state while checking auth or fetching data
  if (authLoading || loading) {
    return <div className="pt-24 text-center">Loading Admin Dashboard...</div>;
  }

  // If not logged in (should be redirected, but as fallback)
  if (!user) {
     return <div className="pt-24 text-center">Access Denied. Redirecting to login...</div>;
  }

  return (
    <>
    <div className="container mx-auto px-4 py-12 pt-24 md:pt-32">
      <div className="flex justify-between items-center mb-8">
<h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('adminDashboardTitle', 'Admin Dashboard - Submissions')}</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
        >
<LogOut size={16} className="mr-2" /> {t('signOut', 'Sign Out')}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('onboarding', 'Onboarding')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('status', 'Status')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('date', 'Date')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('images', 'Images')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('name', 'Name')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('email', 'Email')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('phone', 'Phone')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('age', 'Age')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('country', 'Country')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('language', 'Language')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('contactMethod', 'Contact Method')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('whatsapp', 'WhatsApp')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('telegram', 'Telegram')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('ofAccount', 'OF Account')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('ofVerified', 'OF Verified')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('verifiedPayment', 'Verified Payment')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('earnings30d', 'Earnings (30d)')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('ageConfirmed', 'Age Confirmed')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('reason', 'Reason')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('smartphone', 'Smartphone')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('compensation', 'Compensation')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('hoursPerDay', 'Hours/Day')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('englishSkill', 'English (1-10)')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('explicitContent', 'Explicit Content')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('startAvailability', 'Start Availability')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('blockedCountries', 'Blocked Countries')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('contractSigned', 'Contract Signed')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('equipmentReady', 'Equipment Ready')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('adminNotes', 'Admin Notes')}</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('options', 'Options')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {submissions.length === 0 ? (
              <tr key="no-submissions"><td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No submissions yet.</td></tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSubmission(sub);
                        setSmartphoneModel(sub.smartphone_model || '');
                        setCompensationOffer(sub.compensation_offer || '');
                        setDailyAvailabilityHours(sub.daily_availability_hours ?? '');
                        setEnglishSkillLevel(sub.english_skill_level ?? '');
                        setExplicitContentDetails(sub.explicit_content_details || '');
                        setStartAvailability(sub.start_availability || '');
                        setBlockedCountries(sub.blocked_countries || '');
                        setContractReady(!!sub.contract_signed);
                        setEquipmentReady(!!sub.equipment_ready);
                        setAdminNotes(sub.admin_notes || '');
                        setShowOnboardingModal(true);
                      }}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                    >
                      {t('completeOnboarding', 'Complete Onboarding')}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {(sub.smartphone_model && sub.compensation_offer) ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {t('complete', 'Complete')}
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {t('pending', 'Pending')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.image_urls && sub.image_urls.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveImages(sub.image_urls || []);
                          setActiveSubmissionId(sub.id);
                          setGalleryOpen(true);
                        }}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                      >
                        {t('viewImages', 'View Images')} ({sub.image_urls.length})
                      </button>
                    ) : 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{sub.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.phone_number || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.age ?? 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.country_origin || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.primary_language || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.preferred_contact_method || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.whatsapp_number || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.telegram_username || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.has_of_account === true ? 'Yes' : sub.has_of_account === false ? 'No' : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.is_of_verified === true ? 'Yes' : sub.is_of_verified === false ? 'No' : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.has_verified_payment === true ? 'Yes' : sub.has_verified_payment === false ? 'No' : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.earnings_last_30_days || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{sub.age_confirmed ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate" title={sub.why_join}>{sub.why_join}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.smartphone_model || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.compensation_offer || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.daily_availability_hours ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.english_skill_level ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate text-gray-500 dark:text-gray-400" title={sub.explicit_content_details}>
                    {sub.explicit_content_details || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.start_availability || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate text-gray-500 dark:text-gray-400" title={sub.blocked_countries}>
                    {sub.blocked_countries || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.contract_signed ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sub.equipment_ready ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate text-gray-500 dark:text-gray-400" title={sub.admin_notes}>
                    {sub.admin_notes || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm('Are you sure you want to delete this submission?')) return;
                        const { error } = await supabase
                          .from('submissions')
                          .delete()
                          .eq('created_at', sub.created_at);
                        if (error) {
                          alert('Error deleting submission: ' + error.message);
                        } else {
                          const { data, error: fetchError } = await supabase
                            .from('submissions')
                            .select('*')
                            .order('created_at', { ascending: false });
                          if (!fetchError) {
                            setSubmissions(data || []);
                          }
                        }
                      }}
                      className="px-2 py-1 border border-red-300 dark:border-red-600 rounded text-xs hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400"
                    >
                      {t('delete', 'Delete')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    {showOnboardingModal && activeSubmission && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
<div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-300/20 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Complete Onboarding</h2>
            <button
              onClick={() => setShowOnboardingModal(false)}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">For: {activeSubmission.full_name}</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Smartphone</label>
              <input value={smartphoneModel} onChange={(e) => setSmartphoneModel(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Compensation</label>
              <input value={compensationOffer} onChange={(e) => setCompensationOffer(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hours/Day</label>
              <input value={dailyAvailabilityHours} onChange={(e) => setDailyAvailabilityHours(e.target.value === '' ? '' : parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English (1-10)</label>
              <input value={englishSkillLevel} onChange={(e) => setEnglishSkillLevel(e.target.value === '' ? '' : parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explicit Content</label>
              <textarea value={explicitContentDetails} onChange={(e) => setExplicitContentDetails(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Availability</label>
              <input value={startAvailability} onChange={(e) => setStartAvailability(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blocked Countries</label>
              <textarea value={blockedCountries} onChange={(e) => setBlockedCountries(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
            </div>
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract Signed?</label>
              <input type="checkbox" checked={contractReady} onChange={(e) => setContractReady(e.target.checked)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admin Notes</label>
              <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-6 px-6 pb-6">
            <button
              onClick={async () => {
                if (!activeSubmission) return;
                const { error } = await supabase
                  .from('submissions')
                  .update({
                    smartphone_model: smartphoneModel,
                    compensation_offer: compensationOffer,
                    daily_availability_hours: dailyAvailabilityHours === '' ? null : dailyAvailabilityHours,
                    english_skill_level: englishSkillLevel === '' ? null : englishSkillLevel,
                    explicit_content_details: explicitContentDetails,
                    start_availability: startAvailability,
                    blocked_countries: blockedCountries,
                    contract_signed: contractReady,
                    admin_notes: adminNotes,
                  })
                  .eq('created_at', activeSubmission.created_at);

                if (error) {
                  alert('Error saving onboarding info: ' + error.message);
                } else {
                  setShowOnboardingModal(false);
                  // Refresh submissions list
                  const { data, error: fetchError } = await supabase
                    .from('submissions')
                    .select('*')
                    .order('created_at', { ascending: false });
                  if (!fetchError) {
                    setSubmissions(data || []);
                  }
                }
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
    </div>

    {/* Modal Gallery */}
    {galleryOpen && activeImages && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
<div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-300/20 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Submission Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeImages?.map((url, idx) => (
              <button
                key={`${activeSubmissionId}-${url}`}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className="focus:outline-none"
              >
                <img
                  src={url}
                  alt={`Submission Image ${idx + 1}`}
                  className="w-full h-40 object-cover rounded border border-gray-300 dark:border-gray-600 hover:opacity-80 transition bg-gray-100 dark:bg-gray-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        {selectedImageIndex !== null && activeImages && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-60 p-4">
            <div className="relative max-w-3xl w-full max-h-[90vh] overflow-auto flex items-center justify-center">
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-3 right-3 text-white hover:text-gray-300 text-3xl font-bold z-10"
              >
                &times;
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev !== null
                      ? (prev - 1 + activeImages.length) % activeImages.length
                      : 0
                  )
                }
                className="absolute left-3 text-white hover:text-gray-300 text-3xl font-bold z-10"
              >
                ◀
              </button>
              <img
                src={activeImages[selectedImageIndex]}
                alt="Enlarged Submission"
                className="w-full h-auto max-h-[90vh] object-contain rounded shadow-lg"
              />
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev !== null
                      ? (prev + 1) % activeImages.length
                      : 0
                  )
                }
                className="absolute right-3 text-white hover:text-gray-300 text-3xl font-bold z-10"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    )}
    </>
  );
};

export default AdminDashboard;
