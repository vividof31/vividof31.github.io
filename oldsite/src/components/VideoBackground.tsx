import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImage: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl, fallbackImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoFailed, setIsVideoFailed] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playAttemptInterval: number;

    const playVideo = async () => {
      if (!mountedRef.current || !video) return;

      try {
        // Set playback rate to normal
        video.playbackRate = 1.0;
        
        // Ensure video is muted (required for autoplay)
        video.muted = true;
        
        // Set video to play inline (required for iOS)
        video.playsInline = true;
        
        // Force low-power mode off for better playback
        video.style.objectFit = 'cover';
        
        if (video.paused) {
          // Start loading the video
          video.load();
          await video.play();
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Video playback failed:', error);
          setIsVideoFailed(true);
        }
      }
    };

    // Initial setup
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    // Handle video loaded
    const handleCanPlay = () => {
      playVideo();
    };

    // Retry playing if stalled
    const handleStalled = () => {
      if (mountedRef.current) {
        playAttemptInterval = window.setInterval(() => {
          if (video.paused && mountedRef.current) {
            playVideo();
          } else {
            clearInterval(playAttemptInterval);
          }
        }, 1000);
      }
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused && mountedRef.current) {
        playVideo();
      }
    };

    // Handle user interaction
    const handleUserInteraction = () => {
      if (video.paused && mountedRef.current) {
        playVideo();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('suspend', handleStalled);
    video.addEventListener('waiting', handleStalled);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    // Start playing
    playVideo();

    // Cleanup function
    return () => {
      mountedRef.current = false;
      clearInterval(playAttemptInterval);
      
      if (video) {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('stalled', handleStalled);
        video.removeEventListener('suspend', handleStalled);
        video.removeEventListener('waiting', handleStalled);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
        
        // Properly cleanup video element
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  if (isVideoFailed) {
    return (
      <div className="absolute inset-0">
        <img
          src={fallbackImage}
          alt="Background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline=""
        x5-playsinline=""
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-cover"
        onError={() => setIsVideoFailed(true)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
  );
};

export default VideoBackground;