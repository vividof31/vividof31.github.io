import React, { useState, useEffect, useRef } from 'react'
import JoinUsForm from './JoinUsForm'
import { useLanguage } from '../contexts/LanguageContext'
import { mediaConfig } from '../config/media'

const Home = () => {
  const [showJoinUsForm, setShowJoinUsForm] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const loopCountRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const selectRandomVideo = () => {
    const videos = mediaConfig.home.backgroundVideos;
    const currentVideo = selectedVideo;
    let newVideo = currentVideo;
    
    // Ensure we select a different video
    while (newVideo === currentVideo) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      newVideo = videos[randomIndex];
    }
    
    setSelectedVideo(newVideo);
    loopCountRef.current = 0;

    // Play the new video if video element exists
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  useEffect(() => {
    selectRandomVideo();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      loopCountRef.current += 1;
      
      if (loopCountRef.current >= 5) {
        selectRandomVideo();
      } else {
        // If not switching videos, replay the current one
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [selectedVideo]);

  const handleVideoError = () => {
    console.error('Video playback failed');
    setVideoFailed(true);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        {!videoFailed && selectedVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={handleVideoError}
            poster={mediaConfig.home.fallbackImage}
          >
            <source src={selectedVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaConfig.home.fallbackImage}
            alt="background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{t('welcomeToVivid')}</h1>
        <p className="text-xl mb-8">Focus on your content, we'll handle the rest.</p> {/* Added sub-headline */}
        <div className="space-x-4">
          <button
            onClick={() => setShowJoinUsForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            {t('joinUs')}
          </button>
          <a href="#about" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            {t('learnMore')}
          </a>
        </div>
      </div>
      {showJoinUsForm && <JoinUsForm onClose={() => setShowJoinUsForm(false)} />}
    </section>
  )
}

export default Home
