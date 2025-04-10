import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSideMenuOpen &&
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideMenuOpen]);

  const menuItems = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#results', label: t('results') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#faq', label: t('faq') }
  ];

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setLanguage(newLanguage);
    setIsSideMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-40 transition-colors duration-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a 
            href="#home" 
            onClick={scrollToTop}
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src={isDarkMode ? "/logo-l.png" : "/logo.png"} 
              alt="Vivid Logo" 
              className="h-8 w-auto" 
            />
          </a>
          <button
            ref={menuButtonRef}
            onClick={toggleSideMenu}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isSideMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out ${
          isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-4">
          <nav className="mt-8">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 block py-2" 
                    onClick={() => setIsSideMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between text-gray-800 dark:text-gray-200 py-2"
                >
                  <span>{isDarkMode ? t('lightMode') : t('darkMode')}</span>
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </li>
              <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-gray-800 dark:text-gray-200 py-2">
                  <span className="flex items-center gap-2">
                    {t('language')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`px-2 py-1 text-sm rounded ${
                        language === 'en' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className={`px-2 py-1 text-sm rounded ${
                        language === 'es' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      ES
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header