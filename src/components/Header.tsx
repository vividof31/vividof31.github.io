import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import 'country-flag-icons/react/3x2'; // Import base CSS

interface HeaderProps {
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => void;
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleSmoothScroll, openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langDropdownRef]);

  // Updated click handler for navigation links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, to: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu first

    // Check if it's a hash link for the current page (root)
    if (location.pathname === '/' && to.startsWith('/#')) {
      handleSmoothScroll(e, to); // Let the smooth scroll handler take over
    } 
    // If it's the Home link ('/') and we are already home, scroll to top
    else if (to === '/' && location.pathname === '/') {
       e.preventDefault(); // Prevent default Link behavior
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise, let the Link component handle navigation (e.g., going from /privacy to /)
    // The ScrollToTop component in App.tsx will handle scrolling to top on route change.
  };

  const navLinks = [
    { to: '/', labelKey: 'home' },
    { to: '/#about', labelKey: 'about' },
    { to: '/#services', labelKey: 'services' },
    { to: '/#why-us', labelKey: 'whyUs' },
    { to: '/#how-it-works', labelKey: 'howItWorks' },
    { to: '/#faq', labelKey: 'faq' },
    { to: '/#contact', labelKey: 'contact' },
  ];

  const handleLanguageSelect = (lang: 'en' | 'es' | 'ru') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
<header className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:bg-gradient-to-r dark:from-black dark:via-gray-900 dark:to-black fixed w-full z-50 min-h-[4rem]">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center space-x-2">
            <img src={theme === 'dark' ? "/logo-l.png" : "/logo.png"} alt="Vivid Agency Logo" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={(e) => handleLinkClick(e, link.to)} className="text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ fontSize: '0.875rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
              {t(link.labelKey)}
            </Link>
          ))}
          {/* Removed Apply Now button */}
        </div>

        {/* Right side controls: Language, Theme, Mobile Menu */}
        <div className="flex items-center space-x-2">
           {/* Language Dropdown */}
           <div className="relative" ref={langDropdownRef}>
             <button
               onClick={toggleLangDropdown}
               className="flex items-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
               aria-label="Select Language"
             >
<img
  src={language === 'en' ? '/flags/us.svg' : language === 'es' ? '/flags/es.svg' : '/flags/ru.svg'}
  alt="Flag"
  className="w-5 h-5 inline-block"
/>
               <ChevronDown size={16} className="ml-1" />
             </button>
             {isLangDropdownOpen && (
               <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50">
                 <button onClick={() => handleLanguageSelect('en')} className={`w-full px-4 py-2 text-sm flex items-center justify-center ${language === 'en' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-600`}>
<img src="/flags/us.svg" alt="US Flag" className="w-5 h-5 inline-block mr-2" /> English
                 </button>
                 <button onClick={() => handleLanguageSelect('es')} className={`w-full px-4 py-2 text-sm flex items-center justify-center ${language === 'es' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-600`}>
<img src="/flags/es.svg" alt="Spain Flag" className="w-5 h-5 inline-block mr-2" /> Español
                 </button>
                 <button onClick={() => handleLanguageSelect('ru')} className={`w-full px-4 py-2 text-sm flex items-center justify-center ${language === 'ru' ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-600`}>
<img src="/flags/ru.svg" alt="Russia Flag" className="w-5 h-5 inline-block mr-2" /> Русский
                 </button>
               </div>
             )}
           </div>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={(e) => handleLinkClick(e, link.to)} className="text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {t(link.labelKey)}
              </Link>
            ))}
             {/* Removed Apply Now button */}
          </div>
        </div>
      )}
    </header>
  );
};

// Base styles removed for brevity, assume they are defined elsewhere or inline

export default Header;
