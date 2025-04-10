import React from 'react'
import { Instagram, Mail, Phone, MapPin, ArrowUpCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <img 
              src="/logo-l.png" 
              alt="Vivid Logo" 
              className="h-8 w-auto mb-4" 
            />
            <p className="text-sm mb-4">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/vivid.of" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@vivid.com" 
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t('services')}
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  {t('results')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  {t('testimonials')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t('faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (213) 263-4527</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:contact@vivid.com" 
                  className="hover:text-white transition-colors"
                >
                  contact@vivid.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>7609 Mckinley Ave<br />Los Angeles, CA 90001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2024 Vivid Agency - {t('allRightsReserved')}
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <span>{t('backToTop')}</span>
              <ArrowUpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer