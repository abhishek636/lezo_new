'use client';
 
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../globals.css';
import Link from 'next/link';
import Footer from '../components/Footer';
import MarqueeBanner from '../components/MarqueeBanner';
import Logo from '../components/Logo';
import BackgroundVideo from '../components/BackgroundVideo';
 
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
  const [showTermsPopup, setShowTermsPopup] = useState(false);
 
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
      <BackgroundVideo />
      <MarqueeBanner text={marqueeText}/>
      <Logo/>
 
      {/* Modal */}
      <div className=" fixed custom-marrggin-a inset-0 z-30 flex justify-center sm:items-center items-end sm:w-auto mx-auto overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
        <div
          ref={modalRef}
          className={`absolute rounded-lg border border-gray-400 backdrop_custom shadow-xl ${isMaximized ? 'top-0 left-0 w-full sm:h-[calc(100vh-150px)] h-[calc(100vh-70px)] backdrop_custom bg-custom-gradient' : 'lg:w-[890px] w-full bg-custom-gradient'}`}
          style={!isMaximized && isClient? { left: position.x, top: position.y } : {}}
        >
          {/* Header */}
          <div onMouseDown={handleMouseDown}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             className={`px-4 py-2 bg-[#4C4C4C] md:cursor-move rounded-t-lg relative ${
                    showTermsPopup ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
          >
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsVisible(false);
                  router.push('/');
                }}
              >
                <Image src='/modal_close.svg' alt='Close_model.svg' width={18} height={18}/>
              </button>
              {/* <button className="w-3 h-3 bg-yellow-500 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} /> */}
              <button  onClick={handleMinimize} >
                <Image src='/minimizeicon.svg' alt='minimizeicon.svg' width={18} height={18}/>
              </button>
              <button  onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} >
                <Image src='/maximize.svg' alt='maximize.svg' width={18} height={18}/></button>
              </div>
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Image src="/bridgy_logo.svg" alt="LEZO Logo" width={126} height={21} />
            </div>
          </div>
 
          {/* Modal Content */}
          {!isMinimized && (
            <div>
              {!accepted ? (
                <div className="flex items-center justify-center flex-1 overflow-y-auto px-6 md:px-36 py-20 md:py-28">
                  <div className={`p-4 space-y-4 bg-custom-gradient rounded-lg transition-opacity duration-300 ${
                    showTermsPopup ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    <h2 className="text-2xl text-white">Disclaimer</h2>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox1} onChange={(e) => setCheckbox1(e.target.checked)} />
                      <span className="text-white">
                        Please accept the{' '}
                        <button type="button" className="underline text-blue-400" onClick={() => setShowTermsPopup(true)}>
                          terms & conditions
                        </button>{' '}
                        to continue.
                      </span>
                    </label>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="form-checkbox mt-1" checked={checkbox2} onChange={(e) => setCheckbox2(e.target.checked)} />
                      <span className="text-white">I understand the app is in experimental mode and will only use it for testing at my own risk with not more than $100.</span>
                    </label>
                    <button className={`px-8 py-2 rounded text-white ${isAcceptEnabled ? 'bg-[#000] hover:bg-gray-900' : 'bg-[#4C4C4C] cursor-not-allowed'}`} disabled={!isAcceptEnabled} onClick={() => setAccepted(true)}>Accept</button>
                  </div>
                  {showTermsPopup && (
                    <div className="fixed inset-0 bg-custom-gradient backdrop_custom z-50 flex items-center justify-center px-4">
                      <div className=" w-full max-w-md rounded-lg space-y-4 relative">
                        <h3 className="text-xl font-semibold text-white">Risk Disclaimer</h3>
                        <div className="text-sm text-white sm:max-h-90 max-h-64 overflow-y-auto">
                          <p>
                          1. Purpose & Acknowledgment
                            Lezo is a decentralized AI infrastructure designed to serve as the Operating System of AI Agents on the Solana blockchain. By accessing or using Lezo, you acknowledge and accept that you are engaging with experimental, high-risk technology involving crypto assets, autonomous agents, and smart contracts. Your interaction with the platform is entirely voluntary and at your own discretion.
                            </p>
                            <p>
                            2. Autonomous Tools Are Not Advisors
                            AI agents and automation tools available through Lezo are not substitutes for human judgment, financial expertise, or legal counsel.
                            All insights, outputs, and suggested actions are generated without human intervention and should not be interpreted as investment advice.
                            Users should consult licensed professionals for financial or legal decisions and always perform their own due diligence.
                            </p>
                            <p>
                            3. Transactional Irreversibility
                            All interactions on Lezo are executed via blockchain transactions that are final and immutable.
                            There are no chargebacks, refunds, or cancellations.
                            Losses due to incorrect wallet addresses, contract errors, or timing issues cannot be recovered once broadcasted to the Solana network.
                            </p>
                            <p>
                            4. Experimental Infrastructure Risks
                            Lezo is an evolving open-source platform. Bugs, outages, misbehavior of agents, or unforeseen smart contract vulnerabilities may occur.
                            Using Lezo implies acknowledgment of these risks and acceptance of the possibility of service instability or functional limitations.
                            </p>
                            <p>
                            5. Market Exposure & Liquidity Fragility
                            Crypto assets traded or analyzed through Lezo agents are subject to extreme market volatility, regulatory shifts, and potential delistings.
                            Thin liquidity in some markets may result in slippage, loss of value, or inability to execute orders at intended prices.
                            </p>
                            <p>
                            6. Third-Party Protocol Dependencies
                            Lezo integrates and interacts with external DeFi platforms, APIs, and services.
                            We do not audit or guarantee the functionality, uptime, or safety of these third-party systems.
                            Failures on those ends may impact your experience or cause transactional disruptions.
                            </p>
                            <p>
                            7. Cybersecurity & User Protection
                            Lezo will never ask for your private keys. You are solely responsible for wallet security, key storage, and avoiding phishing schemes.
                            While Lezo follows best practices in security, no system is immune to attacks, exploits, or sophisticated social engineering.
                            </p>
                            <p>
                            8. Regulatory Restrictions
                            Lezo is not accessible to users in jurisdictions where DeFi or AI-related blockchain technologies are restricted, including but not limited to the United States and the United Kingdom.
                            You must ensure that your use of Lezo complies with local laws, including those related to digital assets, taxation, and AI governance.
                            </p>
                            <p>
                            9. No Guarantees from AI Output
                            AI agents on Lezo may produce results based on real-time data, historical trends, or probabilistic models—but outcomes are not guaranteed.
                            Predictions, auto-trades, or signal-based strategies can fail due to technical delays, data errors, or unforeseen market shifts.
                            </p>
                            <p>
                            10. Evolving Terms & Continuous Consent
                            This Risk Notice may be updated as Lezo grows and evolves. Continued use of the platform implies ongoing acceptance of the most current version.
                            We recommend checking back periodically to remain informed of any updates.

                            Closing Note
                            Lezo is built for forward-thinking users who understand the complexities of decentralized systems, automated agents, and AI-powered execution environments. If you're engaging with Lezo, you're doing so with the awareness that innovation carries risk—and the responsibility for every action lies with you.                          </p>
                        </div>
                        <div className="w-full flex justify-center mt-6">
                          <button
                            onClick={() => setShowTermsPopup(false)}
                          >
                            <Image src="popupclosebtn.svg" alt="popupclosebtn.svg" width={40} height={40} />
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="sm:py-7 sm:px-16  p-4 flex flex-col min-h-[500px] h-full sm:p-4 p-2 rounded-b-lg text-[#4C4C4C] space-y-4 overflow-hidden">
                  <div className='flex gap-2 justify-center items-center mb-6 flex-wrap'>
                     {messages.length > 0 && (
                          <div className="flex gap-2 sm:order-2">
                            <button className="bg-black flex gap-2 text-[#fff] px-4 py-2 rounded-lg">
                              <Image src="/create_chat.svg" alt='chat' width={13} height={13} />
                              Create new chat
                            </button>
                            <button className="bg-black flex gap-2 text-[#fff] px-4 py-2 rounded-lg">
                              <Image src="/create_chat.svg" alt='chat' width={13} height={13} /> Chat History
                            </button>
                          </div>
                        )}
                    <div
                      className="relative inline-block sm:order-1"
                      onMouseEnter={() => !isMobile && setDropdownOpen(true)}
                      onMouseLeave={() => !isMobile && setDropdownOpen(false)}
                    >
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {/* Wallet Info */}
                        <div
                          onClick={() => isMobile && setDropdownOpen((prev) => !prev)}
                          className="relative inline-flex gap-1 items-center bg-white/40 rounded-xl p-2 px-2.5 text-[#4C4C4C] cursor-pointer"
                        >
                          <Image src="/vaulate.svg" alt="Logo" width={20} height={20} />
                          EFWvSq...v27Q9g
                          <div className="pl-6">
                            <Image src="/weui_arrow-outlined.svg" alt="Arrow" width={16} height={16} />
                          </div>
                          {isDropdownOpen && (
                              <div className="absolute top-10 left-0 right-0 bg-[#71818b] backdrop-blur-[76px] rounded-md shadow-lg z-20">
                                <ul className="text-left text-sm text-white">
                                  <li className="px-4 py-2 rounded-t-md hover:bg-[#000] hover:text-white cursor-pointer flex sm:gap-2 justify-between items-center">
                                    EFWVsq...v27Q9g <p className="text-xs">(Linked wallet)</p>
                                  </li>
                                  <li className="flex px-4 py-2 rounded-b-md hover:bg-[#000] hover:text-white cursor-pointer">
                                    <Image src="/material-symbols_logout.svg" alt="Logout" width={21} height={21} className="mr-2" />
                                    Logout
                                  </li>
                                </ul>
                              </div>
                            )}
                        </div>

                        
                      </div>
                      
                    </div>
                  </div>
                  <div className=" sm:flex-1 overflow-y-auto p-2 rounded sm:mb-4 mb-0">
                    {messages.length === 0 && (
                       <div className="rounded-lg text-center text-[#4C4C4C] space-y-6">
                   
                          <h2 className="sm:text-[40px] text-lg text-white  sm:mb-2 mb-0">
                            Where do you want to Bridge today?
                          </h2>
                          <p className=" text-white">Choose from various Bridging options.</p>
                          {messages.length === 0 && (
                      <div className="rounded-lg text-center text-[#4C4C4C] space-y-6 mb-4">
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-[744px] mx-auto">
                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid1.1.svg" alt="From Token" width={51} height={24} className="object-contain" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid1.2.svg" alt="To Token" width={51} height={24} className="object-contain" />
                          </div>

                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid1.1.svg" alt="From Token" width={51} height={24} className="object-contain" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid2.2.svg" alt="To Token" width={99} height={24} className="object-contain sm:w-auto w-[60%]" />
                          </div>

                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid1.1.svg" alt="From Token" width={51} height={24} className="object-contain" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid3.2.svg" alt="To Token" width={51} height={24} className="object-contain" />
                          </div>

                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid1.2.svg" alt="From Token" width={51} height={24} className="object-contain" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid1.1.svg" alt="To Token" width={51} height={24} className="object-contain" />
                          </div>

                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid2.2.svg" alt="From Token" width={99} height={24} className="object-contain sm:w-auto w-[60%]" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid1.1.svg" alt="To Token" width={51} height={24} className="object-contain " />
                          </div>

                          <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-custom-gradient backdrop_custom rounded-lg p-3">
                            <Image src="/grid3.2.svg" alt="From Token" width={51} height={24} className="object-contain" />
                            <span className="text-white text-sm sm:text-base">›</span>
                            <Image src="/grid1.1.svg" alt="To Token" width={51} height={24} className="object-contain" />
                          </div>
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
                    <div className="relative w-full  max-w-[744px] mx-auto">
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