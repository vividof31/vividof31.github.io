import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { toast } from 'sonner'

interface JoinUsFormProps {
  onClose: () => void;
}

const JoinUsForm: React.FC<JoinUsFormProps> = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('submissionSuccess'));
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{t('joinUs')}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">{t('name')}</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">{t('email')}</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" required />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">{t('phone')}</label>
            <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" required />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">{t('whyJoin')}</label>
            <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" required></textarea>
          </div>
          <div>
            <label htmlFor="files" className="block mb-1 font-medium">{t('uploadFiles')}</label>
            <input
              type="file"
              id="files"
              name="files"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-sm text-gray-500 mt-1">{t('multipleFiles')}</p>
          </div>
          {selectedFiles && (
            <div>
              <p className="font-medium">{t('selectedFiles')}:</p>
              <ul className="list-disc list-inside">
                {Array.from(selectedFiles).map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
              disabled={isSubmitting}
            >
              {t('cancel')}
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JoinUsForm