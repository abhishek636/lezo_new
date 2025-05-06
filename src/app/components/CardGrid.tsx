import Image from 'next/image';
import { Card } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  hide: boolean;
}

const CardGrid = ({ cards, onCardClick, hide }: CardGridProps) => {
  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          key="card-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeInOut' }} // <-- Added delay here
          className="absolute xl:bottom-34 sm:bottom-56 bottom-25 w-full flex justify-center sm:gap-5 gap-3 pointer-events-auto"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
              onClick={() => onCardClick(card)}
            >
              <Image
                src={card.imageSrc}
                alt={card.title}
                width={127}
                height={127}
                loading="eager"
                className="w-20 h-20 md:w-32 lg:w-full lg:h-full backdrop_custom rounded-3xl"
              />
              <p className="sm:text-xl mt-3.5 text-[#CDDDDE] font-bold uppercase rawpixel">
                {card.title}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardGrid;
