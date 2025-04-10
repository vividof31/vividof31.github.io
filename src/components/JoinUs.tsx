import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

// Define props type
interface JoinUsProps {
  openModal: () => void;
}

const JoinUs: React.FC<JoinUsProps> = ({ openModal }) => {
  const { t } = useLanguage(); // Use hook

  return (
    <section id="join" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t('joinUsTitle')} {/* Use key */}
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {t('joinUsSubtitle')} {/* Use key */}
        </p>
        <button
          onClick={openModal} // Use openModal function
          className="inline-block bg-white text-blue-600 font-bold py-3 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl hover:bg-gray-100 transform hover:-translate-y-1"
        >
          {t('applyNow')} {/* Use key */}
        </button>
      </div>
    </section>
  );
};

export default JoinUs;
