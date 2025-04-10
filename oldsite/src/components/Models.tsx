import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { mediaConfig } from '../config/media'

const Models = () => {
  const { t } = useLanguage();
  const modelData = mediaConfig.models;

  return (
    <section id="models" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">{t('ourTopModels')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modelData.map((model, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src={model.image} 
                alt={model.name} 
                className="w-full h-96 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center dark:text-white">{model.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Models