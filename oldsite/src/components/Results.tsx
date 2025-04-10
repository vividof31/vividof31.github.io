import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Trophy, DollarSign, TrendingUp, Users } from 'lucide-react'

const Results = () => {
  const { t } = useLanguage()

  const stats = [
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      value: '1%',
      label: t('topCreators'),
      description: t('topCreatorsDesc')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      value: '20K+',
      label: t('monthlyEarnings'),
      description: t('monthlyEarningsDesc')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      value: '500%',
      label: t('growthRate'),
      description: t('growthRateDesc')
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      value: '100K+',
      label: t('followers'),
      description: t('followersDesc')
    }
  ]

  // Removed successStories array

  return (
    <section id="results" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          {t('ourResults')}
        </h2>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-md"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Concluding Statement and CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our strategic approach consistently delivers outstanding growth for dedicated creators.
          </p>
          <a 
            href="#joinUs" 
            onClick={(e) => { // Basic smooth scroll for anchor link if needed, assuming similar setup as App.tsx
              e.preventDefault();
              const targetElement = document.getElementById('joinUs'); // Or however JoinUsForm is targeted
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              } else {
                 // Fallback or trigger modal if #joinUs isn't a section ID
                 // This might need adjustment based on how JoinUsForm is shown (modal vs section)
                 // For now, just navigate, assuming it might trigger modal via URL hash change or similar logic elsewhere
                 window.location.hash = 'joinUs'; 
                 // A better approach might be needed depending on JoinUsForm implementation
              }
            }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Apply to Join Vivid
          </a>
        </div>
      </div>
    </section>
  )
}

export default Results
