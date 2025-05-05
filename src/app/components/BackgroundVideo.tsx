import { useEffect, useState } from 'react';

export default function  BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return(
    
    <div className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] -translate-x-1/2 -translate-y-1/2">
      <video
        className="w-full h-full object-cover scale-125"
        src={isMobile ? '/wallpapersmall.mov.mp4' : '/newvideo.mov'}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 scale-125" 
        src="/video_overlay.svg" 
        alt="Overlay"
      />
    </div>
  )
}

  