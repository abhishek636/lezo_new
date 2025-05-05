import Image from 'next/image';
import { PopupContent } from './types';

interface Props {
  content: PopupContent;
  onClose: () => void;
}

const PopupModal = ({ content, onClose }: Props) => (
  <div className="fixed top-1/4 left-1 right-0 flex items-center justify-center z-50 ">
    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 px-3 rounded-2xl w-[597px] h-[55vh] flex flex-col overflow-hidden pb-[8vh]">

        <div className="text-center sm:text-[34px] text-lg  text-white font-semibold sm:pt-5 sm:pb-3 px-4 py-3">
            {content.title}
        </div>
      
        <div className="flex-1 overflow-y-auto overflow-x-hidden sm:p-2 p-2">
            <div className="grid md:grid-cols-4 sm:grid-cols-5 grid-cols-3 sm:gap-4 gap-2">
            {content.additionalCards?.map((card) => (
                <a key={card.id} href={card.href} className="flex flex-col items-center justify-center w-full hover:scale-110 transition-transform">
                <div className=" rounded-lg">
                    <Image src={card.imageSrc} alt={card.title} width={107} height={107} />
                </div>
                <p className=" mt-2 text-white">{card.title}</p>
                </a>
            ))}
            </div>
        </div>
        <button onClick={onClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-300">
            <Image src="/Close.png" alt="Close Button" width={40} height={40} priority className="hover:bg-gradient-to-br from-white/60 to-white/10 rounded-full" />
        </button>
    </div>
  </div>
);

export default PopupModal;
