import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Camera, 
  Video, 
  Users, 
  Briefcase,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  BarChart,
  Megaphone // Added Megaphone icon
} from 'lucide-react'

const Services = () => {
  const { t } = useLanguage()

  const services = [
    {
      icon: <Camera className="h-8 w-8 text-pink-500" />,
      title: t('photoShoots'),
      description: t('photoShootsDesc'),
      color: 'hover:bg-pink-50 dark:hover:bg-pink-900/10'
    },
    {
      icon: <Video className="h-8 w-8 text-purple-500" />,
      title: t('videoProduction'),
      description: t('videoProductionDesc'),
      color: 'hover:bg-purple-50 dark:hover:bg-purple-900/10'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: t('talentManagement'),
      description: t('talentManagementDesc'),
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/10'
    },
    {
      icon: <Megaphone className="h-8 w-8 text-green-500" />, // Changed icon to Megaphone
      title: t('bookingServices'), // Title is now "Marketing & Promotion" via translation
      description: t('bookingServicesDesc'), // Description updated via translation
      color: 'hover:bg-green-50 dark:hover:bg-green-900/10'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-yellow-500" />, // Changed icon to MessageSquare
      title: t('modelTraining'), // Title is now "24/7 Chatter Management" via translation
      description: t('modelTrainingDesc'), // Description updated via translation
      color: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10'
    },
    {
      icon: <BarChart className="h-8 w-8 text-red-500" />,
      title: 'Analytics',
      description: 'Detailed performance tracking and audience insights.',
      color: 'hover:bg-red-50 dark:hover:bg-red-900/10'
    }
  ]

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            {t('ourServices')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Comprehensive solutions to help you reach the top 1% of creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 ${service.color} hover:shadow-xl`}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
