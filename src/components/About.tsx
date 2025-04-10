import { Target, ShieldCheck, Users, Award } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

const About = () => {
  const { t } = useLanguage(); // Use the hook

  // Use translation keys for features
  const features = [
    {
      icon: <Target className="w-10 h-10 text-blue-600" />,
      title: t('strategicGrowth'), // Use key
      description: t('strategicGrowthDesc') // Use key
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
      title: t('discreetProfessional'), // Use key
      description: t('discreetProfessionalDesc') // Use key
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: t('expertTeam'), // Use key
      description: t('expertTeamDesc') // Use key
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-600" />,
      title: t('provenSuccess'), // Use key
      description: t('provenSuccessDesc') // Use key
    }
  ];

  return (
<section id="about" className="py-16 md:py-24 bg-gradient-to-r from-pink-50 to-purple-50 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('aboutUs')} {/* Use key */}
          </h2>
          {/* Use keys for descriptions */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {t('aboutDescription')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('aboutDescription2')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1} className="h-full">
              <div
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {feature.title} {/* Already using t() */}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description} {/* Already using t() */}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
