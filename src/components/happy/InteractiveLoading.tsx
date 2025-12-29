'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingBar from './LoadingBar';
import HeartRain from './HeartRain';
import CardStack from './CardStack';
import CardModal from './CardModal';

const MAX_TAPS = 10;

export default function InteractiveLoading() {
  const [progress, setProgress] = useState(0);
  const [taps, setTaps] = useState(0);
  const [hearts, setHearts] = useState<any[]>([]);
  const [showCards, setShowCards] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // auto loading to 99%
  useEffect(() => {
    if (progress >= 99) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 99));
    }, 40);
    return () => clearInterval(timer);
  }, [progress]);

  const handleTap = () => {
    if (progress < 99) return;
    if (taps >= MAX_TAPS) return;

    setTaps((t) => t + 1);
    spawnHearts();

    if (taps + 1 === MAX_TAPS) {
      setProgress(100);
      setTimeout(() => setShowCards(true), 600);
    }
  };

  const spawnHearts = () => {
    const count = Math.floor(Math.random() * 5) + 10;

    setHearts((prev) => {
      const startIndex = prev.length;

      const newHearts = Array.from({ length: count }).map((_, i) => {
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const stackIndex = startIndex + i;

        const isRolling = Math.random() < 0.3; // 30% กลิ้ง
        const slopeFactor = Math.max(40, 200 - stackIndex * 1.5);

        return {
          id: Math.random(),
          side,
          stackIndex,
          isRolling,
          rollFrom: isRolling ? Math.random() * 200 + 150 : 0,

          size: Math.random() * 28 + 80,
          rotate: Math.random() * 40 - 20,

          // 👇 เอียงเข้ากลาง
          offsetX:
            side === 'left'
              ? Math.random() * slopeFactor + 20
              : Math.random() * slopeFactor + 20,
        };
      });

      return [...prev, ...newHearts].slice(-300);
    });
  };
  return (
    <div
      className="relative w-screen h-screen bg-pink-50 flex items-center justify-center overflow-hidden"
      onClick={handleTap}
    >
      {!showCards && (
        <div className="w-2/3">
          <LoadingBar progress={progress} taps={taps} />
        </div>
      )}

      <HeartRain hearts={hearts} />

      {showCards && <CardStack onSelect={(i: number) => setActiveCard(i)} />}

      <AnimatePresence>
        {activeCard !== null && (
          <CardModal index={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
