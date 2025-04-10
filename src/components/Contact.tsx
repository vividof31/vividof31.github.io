import { Instagram, Send, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

const Contact = () => {
  const { t } = useLanguage(); // Use hook

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('contactTitle')} {/* Use key */}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions? We're here to help. Reach out to us via any of the contact methods below.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://www.instagram.com/vivid.of"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Telegram"
          >
            <Send size={24} />
          </a>
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="WhatsApp"
          >
            <Phone size={24} />
          </a>
          <a
            href="mailto:contact@vividagency.com"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
