import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Send, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

const Footer = () => {
  const { t } = useLanguage(); // Use hook
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-black text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Social Media Link */}
        {/* Legal Links */}
        <div className="mb-4">
          <Link to="/privacy-policy" className="text-sm hover:text-yellow-300 px-2">{t('privacyPolicy')}</Link> {/* Use key */}
          <span className="text-sm">|</span>
          <Link to="/terms-of-service" className="text-sm hover:text-yellow-300 px-2">{t('termsOfService')}</Link> {/* Use key */}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Vivid Agency. {t('allRightsReserved')} {/* Use key */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
