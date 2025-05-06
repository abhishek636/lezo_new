const MarqueeBanner = ({ text }: { text: string }) => (
    <div className="absolute top-0 w-full bg-[#FFFFFF29] flex items-center gap-4 px-2 pt-2 pb-1.5 backdrop-blur-3xl whitespace-nowrap overflow-hidden rawpixel font-bold"
    >
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-marquee text-white">
          {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text}
        </div>
      ))}
    </div>
);

export default MarqueeBanner;
  