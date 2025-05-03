'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../globals.css';
import Link from 'next/link';
import Footer from '../components/Footer';

type Message = { role: 'user' | 'bot'; text: string };

export default function DraggableModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hideFooterSection, setHideFooterSection] = useState(true);

  const handleFooterClick = () => {
    setIsMinimized(true); // Set the modal to minimized state
    sessionStorage.setItem('modalMinimized', 'true');
    sessionStorage.setItem('modalPosition', JSON.stringify(position));
    setHideFooterSection(false)
    router.push('/'); // Redirect to the homepage
  };

  useEffect(() => {
    sessionStorage.clear(); // Clear session storage on page load or reopen
    // Optionally, you can also check if there's minimized data and reset it
    setIsMinimized(false); // Reset minimized state on page load
  }, []);

  // Check if viewport is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // 1024px = tablet and below
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const marqueeText = "OPERATING SYSTEM FOR AI AGENTS";

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const updateCenterPosition = () => {
        if (modalRef.current) {
          const modalRect = modalRef.current.getBoundingClientRect();
          const centerX = window.innerWidth / 2 - modalRect.width / 2;
          const centerY = window.innerHeight / 2 - modalRect.height / 2;

          // Adjust position based on screen width (avoid too much left offset on mobile)
          const adjustedLeft = windowWidth <= 768 ? 0 : centerX;

          // Adjust top position based on screen size (for mobile)
          const adjustedTop = windowWidth <= 768 ? window.innerHeight / 5.5 : centerY; // For mobile, set top to 1/4 of the screen height

          setPosition({ x: adjustedLeft, y: adjustedTop });
        }
      };

      // Delay to ensure modalRef is available and has correct dimensions
      setTimeout(updateCenterPosition, 0);
    }
  }, [windowWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMaximized) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isMaximized) return;
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };
  
  const handleTouchEnd = () => setIsDragging(false);

  const handleMouseUp = () => setIsDragging(false);

  const handleMinimize = () => {
    // Store the minimized state and position in sessionStorage
    sessionStorage.setItem('modalMinimized', 'true');
    sessionStorage.setItem('modalPosition', JSON.stringify(position));

    setIsMinimized(true);
    router.push('/'); // Redirect to home page
  };

  const isAcceptEnabled = checkbox1 && checkbox2;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = { role: 'bot', text: `You said: "${userMessage.text}"` };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-screen sm:h-[100vh] h-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] -translate-x-1/2 -translate-y-1/2">
      <video
        className="w-full h-full object-cover scale-125"
        src="/BG.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>
      </div>


      {/* Marquee */}
      <div className="absolute top-0 w-full bg-white/29 flex items-center gap-4 p-2 whitespace-nowrap overflow-hidden">
        <div className="animate-marquee text-white">{marqueeText} &bull; {marqueeText} &bull; {marqueeText}</div>
        <div className="animate-marquee text-white">{marqueeText} &bull; {marqueeText} &bull; {marqueeText}</div>
      </div>

      {/* Logo */}
      <div className="absolute top-1/8 w-full flex justify-center">
      <Link href="/" passHref>
        <Image
          src="/logo.svg"
          alt="LEZO Logo"
          width={200}
          height={100}
          priority
          className="w-32 h-12 sm:w-48 sm:h-24 object-contain cursor-pointer"
        />
      </Link>
      </div>

      {/* Modal */}
      <div className=" fixed custom-marrggin-a inset-0 z-30 flex justify-center sm:items-center items-end sm:w-auto mx-auto overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
        <div
          ref={modalRef}
          className={`absolute rounded-lg border border-gray-400 backdrop_custom shadow-xl ${isMaximized ? 'top-0 left-0 w-full h-full backdrop_custom bg-custom-gradient' : 'lg:w-[890px] w-full bg-custom-gradient'}`}
          style={!isMaximized && isClient? { left: position.x, top: position.y } : {}}
        >
          {/* Header */}
          <div onMouseDown={handleMouseDown} 
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             className="px-4 py-2 bg-[#4C4C4C] md:cursor-move rounded-t-lg relative"
          >
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsVisible(false);
                  router.push('/'); 
                }}
              >
                <Image src='/Close_model.svg' alt='Close_model.svg' width={18} height={18}/>
              </button>
              {/* <button className="w-3 h-3 bg-yellow-500 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} /> */}
              <button  onClick={handleMinimize} >
                <Image src='/minimizeicon.svg' alt='minimizeicon.svg' width={18} height={18}/>
              </button>
              <button  onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} >
                <Image src='/maximize.svg' alt='maximize.svg' width={18} height={18}/></button>
              </div>
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Image src="/Defi logo.png" alt="LEZO Logo" width={100} height={22} />
            </div>
          </div>

          {/* Modal Content */}
          {!isMinimized && (
            <div>
              {!accepted ? (
                <div className="flex items-center justify-center flex-1 overflow-y-auto px-6 md:px-36 py-20 md:py-28">
                  <div className="p-4 space-y-4 bg-custom-gradient rounded-lg">
                    <h2 className="text-2xl text-[#4C4C4C]">Disclaimer</h2>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox1} onChange={(e) => setCheckbox1(e.target.checked)} />
                      <span className="text-[#4C4C4C]">Please accept the terms & conditions to continue.</span>
                    </label>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox2} onChange={(e) => setCheckbox2(e.target.checked)} />
                      <span className="text-[#4C4C4C]">I understand the app is in experimental mode and will only use it for testing at my own risk with not more than $100.</span>
                    </label>
                    <button className={`px-6 py-2 rounded text-white ${isAcceptEnabled ? 'bg-[#4C4C4C] hover:bg-gray-900' : 'bg-[#4C4C4C] cursor-not-allowed'}`} disabled={!isAcceptEnabled} onClick={() => setAccepted(true)}>Accept</button>
                  </div>
                </div>
              ) : (
                <div className="sm:py-7 sm:px-16  p-4 flex flex-col min-h-[500px] h-full sm:p-4 p-2 rounded-b-lg text-[#4C4C4C] space-y-4 overflow-hidden">
                  <div className=" sm:flex-1 overflow-y-auto p-2 rounded sm:mb-4 mb-0">
                    {messages.length === 0 && (
                       <div className="rounded-lg text-center text-[#4C4C4C] space-y-6">
                          <div
                            className="relative inline-block  mb-1 mb-6.5"
                            onMouseEnter={() => !isMobile && setDropdownOpen(true)}
                            onMouseLeave={() => !isMobile && setDropdownOpen(false)}
                          >
                            <div
                              onClick={() => isMobile && setDropdownOpen((prev) => !prev)}
                              className="inline-flex gap-4 px-2.5 gap-1 items-center bg-white/40 rounded-xl p-2 w-content text-[#4C4C4C] cursor-pointer"
                            >
                              <Image src="/vaulate.svg" alt="Logo" width={20} height={20} />
                              EFWvSq...v27Q9g
                              <div className='pl-6'>
                              <Image  src="/weui_arrow-outlined.svg" alt="Arrow" width={16} height={16} />
                              </div>
                            </div>
                    
                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                              <div className="absolute w-100 left-0 w-fit bg-[#ccb58c] backdrop-blur-[76px] rounded-md shadow-lg z-10" >
                                <ul className=" text-left text-sm text-[#4C4C4C]">
                                  <li className="px-4 rounded-t-md py-2 hover:bg-[#4C4C4C] hover:text-white cursor-pointer flex sm:gap-2 justify-between items-center">EFWVsq...v27Q9g <p className='text-xs'>(Linked wallet)</p></li>
                                  <li className="flex  px-4 py-2 hover:bg-[#4C4C4C] hover:text-white cursor-pointer">
                                    <Image
                                      src='/material-symbols_logout.svg'
                                      alt='material-symbols_logout'
                                      width={21}
                                      height={21}
                                    />
                                    Logout</li>
                                </ul>
                              </div>
                            )}
                          </div>
                    
                          <h2 className="sm:text-4xl text-lg text-[#4C4C4C] sm:mb-auto sm:mb-2 mb-0">
                            Where do you want to Bridge today?
                          </h2>
                          <p className="text-sm text-[#4C4C4C]">Choose from various Bridging options.</p>
                          {messages.length === 0 && (
                      <div className="rounded-lg text-center text-[#4C4C4C] space-y-6 mb-4">
                        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 text-sm text-left">
                          {[
                            { label: "Trending", desc: "Search trending tokens", icon: "/trending.png" },
                            { label: "Swap", desc: "Trade crypto assets instantly", icon: "/swap.png" },
                            { label: "Analyze", desc: "Analyse your holdings", icon: "/analyze.png" },
                            { label: "Staking", desc: "Earn rewards by staking", icon: "/staking.png" },
                            { label: "Bridge", desc: "Transfer assets cross-chain", icon: "/bridge.png" },
                            { label: "Snipe", desc: "Snipe new launches quickly", icon: "/snipe.png" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 sm:p-2 p-1 bg-white/10 rounded-lg">
                              <div className="bg-white/10 p-4 rounded-lg mr-2">
                                <Image src={item.icon} alt={item.label} width={20} height={20} />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{item.label}</h4>
                                <p className="text-[#F5F5F5] text-xs">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role !== 'user' && (
                          <div className="w-6 h-6 bg-[#E4EAD8] text-[#4C4C4C] rounded-md flex items-center justify-center text-xs font-semibold mr-2">
                            L
                          </div>
                        )}
                        <div className={`px-4 py-2 text-sm max-w-[80%] rounded-lg bg-white/40 text-[#4C4C4C] shadow-sm`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className=' absolute sm:px-auto px-3 bottom-10 left-0 right-0'>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Bridge with Defy Agent.."
                        className="w-full rounded-lg bg-custom-gradient px-4 py-5 pr-12 text-white placeholder-white/70 focus:outline-none"
                      />
                      <button type="submit" onClick={handleSendMessage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition">
                        <Image src="/rocket.png" alt="send" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer hideSection={hideFooterSection} onClick={handleFooterClick}/>
    </div>
  );
}
