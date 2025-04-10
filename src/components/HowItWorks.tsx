import React from 'react';
import { FileText, Search, UserCheck, TrendingUp } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

const HowItWorks = () => {
  const { t } = useLanguage(); // Use hook

  // Use translation keys
  const steps = [
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: t('step1Title'), // "1. Apply Online"
      description: t('step1Desc') // "Fill out our detailed application form..."
    },
    {
      icon: <Search className="w-10 h-10 text-purple-600" />,
      title: t('step2Title'), // "2. Application Review"
      description: t('step2Desc') // "Our team carefully reviews..."
    },
    {
      icon: <UserCheck className="w-10 h-10 text-green-600" />,
      title: t('step3Title'), // "3. Onboarding Call"
      description: t('step3Desc') // "If selected, we'll schedule a call..."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-red-600" />,
      title: t('step4Title'), // "4. Growth & Management"
      description: t('step4Desc') // "We implement tailored strategies..."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('howItWorksTitle')} {/* Use key */}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('howItWorksSubtitle')} {/* Use key */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1} className="h-full">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center h-full flex flex-col items-center border-2">
                <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {step.title} {/* Already using t() */}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {step.description} {/* Already using t() */}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
