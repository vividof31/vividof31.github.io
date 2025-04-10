import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import routing components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks'; // Import HowItWorks
import JoinUs from './components/JoinUs';
import Contact from './components/Contact';
import FAQ from './components/FAQ'; // Import FAQ component
import Footer from './components/Footer';
import ApplicationFormModal from './components/ApplicationFormModal';
import FadeInWhenVisible from './components/FadeInWhenVisible';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminLogin from './pages/AdminLogin'; // Import AdminLogin
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './index.css';

// Component for the main landing page layout
// Corrected handleSmoothScroll prop type again
const MainPageLayout = ({ openModal, handleSmoothScroll }: { openModal: () => void; handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => void; }) => (
  <>
    {/* Ensure Hero receives the correct prop type */}
    <Hero openModal={openModal} handleSmoothScroll={handleSmoothScroll} /> 
    <FadeInWhenVisible><About /></FadeInWhenVisible>
    <FadeInWhenVisible><Services /></FadeInWhenVisible>
    <FadeInWhenVisible><WhyChooseUs /></FadeInWhenVisible>
    <FadeInWhenVisible><HowItWorks /></FadeInWhenVisible> {/* Add HowItWorks section */}
    <FadeInWhenVisible><FAQ /></FadeInWhenVisible>
    <FadeInWhenVisible><JoinUs openModal={openModal} /></FadeInWhenVisible>
    <FadeInWhenVisible><Contact /></FadeInWhenVisible>
  </>
);

// Scroll to top component for route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Updated smooth scroll handler signature
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    // Use the passed href, removing the leading '/' if present for hash links
    const targetHref = href.startsWith('/#') ? href.substring(1) : href; 
    
    if (targetHref.startsWith('#')) {
      e.preventDefault();
      const elementId = targetHref.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        // Calculate offset for fixed header if necessary
        const headerOffset = 80; // Increase offset slightly
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    // Allow default behavior for non-hash links
  };

  // Apply smooth scroll to relevant links (e.g., in Header)
  // This is a simplified example; a more robust solution might use context or pass handler down
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ScrollToTop /> {/* Add scroll to top component */}
      <Header handleSmoothScroll={handleSmoothScroll} openModal={openModal} />
      <main className="flex-grow pt-14 md:pt-16">
        <Routes>
          <Route path="/" element={<MainPageLayout openModal={openModal} handleSmoothScroll={handleSmoothScroll} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </main>
      <FadeInWhenVisible><Footer /></FadeInWhenVisible>
      <ApplicationFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
