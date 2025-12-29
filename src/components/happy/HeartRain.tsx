import { AnimatePresence, motion } from 'motion/react';
interface Heart {
  id: number;
  side: 'left' | 'right';
  offsetX: number;
  size: number;
  rotate: number;
  stackIndex: number;
  isRolling: boolean;
  rollFrom: number;
}
function HeartRain({ hearts }: { hearts: Heart[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((h) => {
        const isLeft = h.side === 'left';

        return (
          <motion.div
            key={h.id}
            initial={{
              top: -120,
              x: isLeft ? -h.rollFrom : h.rollFrom,
              rotate: h.isRolling ? 0 : h.rotate,
              scale: 0.8,
            }}
            animate={{
              top: 'auto',
              bottom: -100 + h.stackIndex * 8,

              // 👇 เอียงเข้ากลาง
              x: isLeft ? h.offsetX : -h.offsetX,

              // 👇 กลิ้ง
              rotate: h.isRolling ? h.rotate + 360 : h.rotate,
              scale: 1,
            }}
            transition={{
              duration: h.isRolling ? 1.2 : 0.9,
              ease: 'easeOut',
              type: h.isRolling ? 'tween' : 'spring',
              damping: 14,
              stiffness: 90,
            }}
            style={{
              position: 'absolute',
              left: isLeft ? 0 : 'auto',
              right: !isLeft ? 0 : 'auto',
              fontSize: h.size,
              zIndex: h.stackIndex,
            }}
            className="select-none drop-shadow-xl"
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}
export default HeartRain;
