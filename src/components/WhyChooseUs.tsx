import React from 'react';
import { Zap, Target, Shield, Users } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

const WhyChooseUs = () => {
  const { t } = useLanguage(); // Use hook

  // Use translation keys
  const points = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: t('acceleratedGrowth'),
      description: t('acceleratedGrowthDesc')
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: t('maximizedEarnings'),
      description: t('maximizedEarningsDesc')
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t('focusOnCraft'),
      description: t('focusOnCraftDesc')
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: t('dedicatedPartnership'),
      description: t('dedicatedPartnershipDesc')
    }
  ];

  return (
<section id="why-us" className="py-16 md:py-24 bg-gradient-to-r from-yellow-50 to-pink-50 dark:bg-gradient-to-r dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('whyChooseUsTitle')} {/* Use key */}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('whyChooseUsSubtitle')} {/* Use key */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {points.map((point, index) => (
            // Apply fade-in to each point individually
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 p-3 rounded-full bg-gray-100 dark:bg-gray-700 border-2" style={{ borderColor: 'currentColor' }}>
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {point.title} {/* Already using t() */}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {point.description} {/* Already using t() */}
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
