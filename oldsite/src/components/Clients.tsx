import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { mediaConfig } from '../config/media'

const Clients = () => {
  const { t } = useLanguage();

  return (
    <section id="clients" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('ourClients')}</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {mediaConfig.clients.map((client, index) => (
            <div key={index} className="w-40 h-20">
              <img 
                src={client} 
                alt={`Client ${index + 1}`} 
                className="w-full h-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients