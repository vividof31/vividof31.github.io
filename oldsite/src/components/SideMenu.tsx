import React, { forwardRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>(({ isOpen, onClose }, ref) => {
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#works', label: t('works') },
    { href: '#clients', label: t('clients') },
  ];

  return (
    <div
      ref={ref}
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="p-4">
        <nav className="mt-8">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-gray-800 hover:text-blue-600 block py-2" onClick={onClose}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  )
});

export default SideMenu