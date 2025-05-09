const BackgroundVideo = () => (
    <div className="absolute top-1/2 sm:left-1/2 left-0 w-[177.77vh] h-[100vh] -translate-x-1/2 -translate-y-1/2">
  <video
    className="w-full h-full object-cover scale-125"
    src="/newvideo.mov"
    autoPlay
    muted
    loop
    playsInline
  ></video>

  <img
    className="absolute top-0 left-0 w-full h-full object-cover opacity-100 scale-125 sm:block none" 
    src="/video_overlay.svg" 
    alt="Overlay"
  />
  <img
    className="absolute top-0 left-0 w-full h-full object-cover opacity-100 scale-125 block sm:none" 
    src="/mobile_ovr.svg" 
    alt="Overlay"
  />
</div>
);

export default BackgroundVideo;
  