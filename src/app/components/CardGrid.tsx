import Image from 'next/image';
import { Card } from './types';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  hide: boolean; // renamed for clarity
}

const CardGrid = ({ cards, onCardClick, hide }: CardGridProps) => (
  <div className={`absolute xl:bottom-34 sm:bottom-56 bottom-25 w-full flex  justify-center sm:gap-5 gap-3 transition-all duration-500 ${hide ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
    {cards.map((card) => (
      <div
        key={card.id}
        className="flex flex-col items-center  hover:scale-110 transition-transform cursor-pointer "
        onClick={() => onCardClick(card)}
      >
        <Image src={card.imageSrc} alt={card.title} width={127} height={127} 
            className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 " 
        />
        <p className="sm:text-xl mt-3.5 text-white font-light">{card.title}</p>
      </div>
    ))}
  </div>
);

export default CardGrid;
