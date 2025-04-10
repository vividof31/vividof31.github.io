import {
  Camera,
  Video,
  TrendingUp,
  Megaphone,
  MessageSquare,
  BarChart
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

// Function to get services list with translations
const GetServicesList = () => {
  const { t } = useLanguage();
  return [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: t('talentManagement'), // Full Account Management
      description: t('talentManagementDesc'),
      color: "hover:bg-blue-50 dark:hover:bg-blue-900/10"
    },
    {
      icon: <Megaphone className="h-8 w-8 text-green-500" />,
      title: t('bookingServices'), // Marketing & Promotion
      description: t('bookingServicesDesc'),
      color: "hover:bg-green-50 dark:hover:bg-green-900/10"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-yellow-500" />,
      title: t('modelTraining'), // 24/7 Chatter Management
      description: t('modelTrainingDesc'),
      color: "hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
    },
    {
      icon: <Video className="h-8 w-8 text-purple-500" />,
      title: t('videoProduction'), // Video Content Strategy
      description: t('videoProductionDesc'),
      color: "hover:bg-purple-50 dark:hover:bg-purple-900/10"
    },
    {
      icon: <Camera className="h-8 w-8 text-pink-500" />,
      title: t('photoShoots'), // Content Creation Support
      description: t('photoShootsDesc'),
      color: "hover:bg-pink-50 dark:hover:bg-pink-900/10"
    },
    {
      icon: <BarChart className="h-8 w-8 text-red-500" />,
      title: t('analytics'), // Analytics
      description: t('analyticsDesc'),
      color: "hover:bg-red-50 dark:hover:bg-red-900/10"
    }
  ];
};

const Services = () => {
  const { t } = useLanguage(); // Use hook for title/subtitle
  const servicesList = GetServicesList(); // Get list with translations

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('ourServices')} {/* Use key */}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('servicesSubtitle')} {/* Use key */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1} className="h-full">
              <div
                className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 ${service.color} hover:shadow-xl hover:-translate-y-1 h-full flex flex-col border-2`}
              >
                <div className="p-8 flex-grow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    {service.title} {/* Already using t() via GetServicesList */}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description} {/* Already using t() via GetServicesList */}
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

export default Services;
