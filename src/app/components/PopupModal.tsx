import Image from 'next/image';
import { PopupContent } from './types';

interface Props {
  content: PopupContent;
  onClose: () => void;
}

const PopupModal = ({ content, onClose }: Props) => (
  <div className="fixed top-1/4 left-1 right-0 flex items-center justify-center z-50">
    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 px-3 rounded-2xl w-[597px] h-[calc(60vh-80px)] flex flex-col overflow-hidden pb-[8vh]">
      
      {/* Heading */}
      <div className="text-center rawpixel uppercase sm:text-[34px] text-lg text-[#CDDDDE] font-bold sm:pt-5 sm:pb-3 px-4 py-3">
        {content.title}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden sm:p-2 flex items-start justify-center ">
        {content.additionalCards && content.additionalCards.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-5 grid-cols-3 sm:gap-4 gap-2 w-full">
            {content.additionalCards.map((card) => (
              <a key={card.id} href={card.href} className="flex flex-col items-center justify-center w-full hover:scale-110 transition-transform">
                <div className="rounded-lg">
                  <Image src={card.imageSrc} alt={card.title} width={107} height={107} />
                </div>
                <p className="mt-2 text-lg text-[#CDDDDE] rawpixel font-bold uppercase">{card.title}</p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-[#CDDDDE] rawpixel text-2xl font-bold uppercase text-center flex items-center h-full justify-center">
            {content.title === 'Partners'
              ? `Reserved for future partnerships`
              : `Reserved for future ${content.title}`}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button onClick={onClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300">
        <Image
          src="/Close.png"
          alt="Close Button"
          width={40}
          height={40}
          priority
          className="hover:bg-gradient-to-br from-white/60 to-white/10 rounded-full"
        />
      </button>
    </div>
  </div>
);

export default PopupModal;
