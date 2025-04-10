import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { mediaConfig } from '../config/media'

const Works = () => {
  const { t } = useLanguage();

  return (
    <section id="works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('ourWorks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaConfig.works.map((work, index) => (
            <div key={index} className="relative overflow-hidden group">
              <img 
                src={work.image} 
                alt={t(work.title)} 
                className="w-full h-64 object-cover transition duration-300 transform group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-xl font-semibold">{t(work.title)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Works