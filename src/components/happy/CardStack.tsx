import { motion } from 'motion/react';
import { useState } from 'react';

const cardImages = [
  '/cards/card1.jpg',
  '/cards/card2.jpg',
  '/cards/card3.jpg',
  '/cards/card4.jpg',
];

function CardStack({ onSelect }: any) {
  const [opened, setOpened] = useState<number | null>(null);

  const handleOpen = (i: number) => {
    setOpened(i);
    onSelect?.(i);
  };

  return (
    <div className="flex flex-col items-center gap-6 perspective-distant">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        className="
    text-3xl sm:text-5xl font-extrabold
    bg-linear-to-r from-pink-500 via-red-400 to-yellow-400
    bg-clip-text text-transparent
    drop-shadow-[0_4px_10px_rgba(255,105,180,0.6)]
    select-none
  "
      >
        Happy New Year !!
      </motion.div>
      <div className="flex gap-6 perspective-distant">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="relative w-64 h-72 cursor-pointer"
            onClick={() => handleOpen(i)}
            animate={{ rotateY: opened === i ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* หน้าแรก (สี) */}
            <div
              className="absolute inset-0 rounded-xl shadow-lg
                       bg-linear-to-br from-pink-300 to-red-400
                       flex items-center justify-center text-white text-xl font-bold"
              style={{ backfaceVisibility: 'hidden' }}
            ></div>

            {/* หลังการ์ด (รูป) */}
            <div
              className="absolute inset-0 rounded-xl shadow-lg overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundImage: `url(${cardImages[i]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CardStack;
