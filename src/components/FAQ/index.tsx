import { useState } from 'react';
import FAQList from './FAQList';
import { useLanguage } from '../../contexts/LanguageContext'; // Import useLanguage

const FAQ = () => {
  const { t } = useLanguage(); // Use hook
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Use translation keys
  const faqs = [
    { question: t('faqQuestion1'), answer: t('faqAnswer1') },
    { question: t('faqQuestion2'), answer: t('faqAnswer2') },
    { question: t('faqQuestion3'), answer: t('faqAnswer3') },
    { question: t('faqQuestion4'), answer: t('faqAnswer4') },
    { question: t('faqQuestion5'), answer: t('faqAnswer5') },
    { question: t('faqQuestion6'), answer: t('faqAnswer6') },
    { question: t('faqQuestion7'), answer: t('faqAnswer7') }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<section id="faq" className="py-16 md:py-24 bg-gradient-to-r from-green-50 to-blue-50 dark:bg-gradient-to-r dark:from-slate-950 dark:via-indigo-950 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('faqTitle')} {/* Use key */}
        </h2>
        <FAQList
          faqs={faqs}
          openIndex={openIndex}
          onToggle={handleToggle}
        />
      </div>
    </section>
  );
};

export default FAQ;
