import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage

// Define props type
interface HeroProps {
  openModal: () => void;
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => void;
}

// Define actual video paths and fallback image path
const backgroundVideos = [
  '/videos/background.mp4',
  '/videos/background2.mp4',
  '/videos/background3.mp4',
  '/videos/background4.mp4',
  '/videos/background5.mp4',
  '/videos/background6.mp4',
  '/videos/background7.mp4',
  '/videos/background8.mp4',
  '/videos/background9.mp4',
];
const fallbackImage = '/images/background.jpg'; // Path relative to public directory

const Hero: React.FC<HeroProps> = ({ openModal, handleSmoothScroll }) => {
  const { t } = useLanguage(); // Use hook
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);

  const selectNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    setCurrentVideoIndex(nextIndex);
    loopCountRef.current = 0;
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(handleVideoError);
    }
  };

  useEffect(() => {
    setCurrentVideoIndex(Math.floor(Math.random() * backgroundVideos.length));
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const handleEnded = () => {
      loopCountRef.current += 1;
      if (loopCountRef.current >= 3) { selectNextVideo(); }
      else { videoElement.currentTime = 0; videoElement.play().catch(handleVideoError); }
    };
    videoElement.addEventListener('ended', handleEnded);
    return () => videoElement.removeEventListener('ended', handleEnded);
  }, [currentVideoIndex]);

  const handleVideoError = (error?: any) => {
    console.error('Video playback failed:', error);
    setVideoFailed(true);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Video / Image */}
      <div className="absolute inset-0 z-0">
        {!videoFailed && backgroundVideos.length > 0 ? (
          <video ref={videoRef} key={backgroundVideos[currentVideoIndex]} autoPlay muted playsInline className="w-full h-full object-cover" onError={handleVideoError} poster={fallbackImage}>
            <source src={backgroundVideos[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={fallbackImage} alt="Background" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {t('welcomeToVivid')} {/* Use key */}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {t('heroSubtitle')} {/* Use key */}
        </p>
        <div className="space-x-4">
          <button onClick={openModal} className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('applyNow')} {/* Use key */}
          </button>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('learnMore')} {/* Use key */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
