const MarqueeBanner = ({ text }: { text: string }) => (
    <div className="absolute top-0 w-full bg-[#FFFFFF29] flex items-center gap-4 p-2 backdrop-blur-3xl whitespace-nowrap overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-marquee text-white">
          {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text}
        </div>
      ))}
    </div>
);

export default MarqueeBanner;
  