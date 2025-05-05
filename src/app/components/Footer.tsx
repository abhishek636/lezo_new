'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FooterProps = {
  hideSection?: boolean;
  onClick?: () => void;
};

const Footer = ({ hideSection, onClick }: FooterProps) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const router = useRouter();

  // Restore minimized state
  useEffect(() => {
    const minimizedState = sessionStorage.getItem('modalMinimized');

    if (minimizedState === 'true') {
      setIsModalMinimized(true);
    }
  }, []);

  const handleRestore = () => {
    setIsModalMinimized(false);
    sessionStorage.removeItem('modalMinimized');
    router.push('/bridgy');
  };

  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
  
    // Convert hours to 12-hour format
    if (hours > 12) {
      hours = hours - 12;
    }
  
    // Ensure minutes remains a number and is formatted with a leading zero if necessary
    if (minutes < 10) {
      minutes = Number(`0${minutes}`); // Ensure minutes is a number
    }
  
    // Combine hours and minutes in 12-hour format
    const time = `${hours}:${minutes}`;
  
    // Set the formatted time as a string
    setCurrentTime(time); // Ensure currentTime is a string
  }, []);

  return (
    <>
      {/* Footer Base */}
      <div
        onClick={onClick}
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between ms:py-2.5 sm:px-7.5 px-4 py-2 backdrop_custom bg-[#FFFFFF1A] z-50 gradient-border"
      >
        {/* Social Icons on the Left */}
        <div className="flex gap-2">
          <Link target="_blank" href="#">
            <Image src="/x.svg" alt="Twitter" width={54} height={54} />
          </Link>
          <Link target="_blank" href="#">
            <Image src="/telegram.svg" alt="Telegram" width={54} height={54} />
          </Link>
          <Link href="/">
            <Image src="/home.svg" alt="Home" width={54} height={54} />
          </Link>
          {/* Restore Button */}
        {isModalMinimized && (
          <button onClick={handleRestore}>
            <Image src="/bridgy.svg" alt="defy" width={54} height={54} />
          </button>
        )}
        </div>

        

        {/* Time Display on the Right */}
        <div className="rawpixel time_size sm:text-[28px] text-white font-bold bg-[#FFFFFF1A] px-4 pt-3.5 pb-3 rounded-lg">
          {currentTime}
        </div>
      </div>
    </>
  );
};

export default Footer;
