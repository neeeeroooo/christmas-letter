'use client';

import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import ValentineFull from './ValentineFull';

export default function LikeButtonAdvanced() {
  const [liked, setLiked] = useState(false);
  const [showValentine, setShowValentine] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerAnimation = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    btn.classList.remove('animate');
    void btn.offsetWidth;
    btn.classList.add('animate');
  };

  const handleClick = () => {
    triggerAnimation();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setLiked(true);

    // รอ fade out เสร็จแล้วค่อยแสดง card
    setTimeout(() => {
      setShowValentine(true);
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 gap-16">
        {/* Fade Out Section */}
        {!showValentine && (
          <div
            className={`flex flex-col items-center gap-16 transition-opacity duration-500 
            ${liked ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="text-5xl font-bold text-red-500 drop-shadow-lg">
              Happy Valentine's Day! ❤️
            </div>

            <button
              ref={buttonRef}
              onClick={handleClick}
              className="like-btn relative w-96 h-56 rounded-full bg-white shadow-xl flex items-center justify-center transition-transform active:scale-90"
            >
              {/* Ripple */}
              <span className="ripple absolute inset-0 rounded-full border-4 border-red-500 scale-0" />

              {/* Heart */}
              <svg
                viewBox="0 0 24 24"
                className="w-16 h-16 transition-transform duration-300 fill-red-500 stroke-red-500 stroke-2"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </button>
          </div>
        )}

        {/* Fade In Valentine Card */}
        {showValentine && <ValentineFull />}

        {/* Keyframes */}
        <style jsx global>{`
          .like-btn.animate svg {
            animation: heart-bounce 0.5s cubic-bezier(0.7, 0, 0.3, 1);
          }

          @keyframes heart-bounce {
            30% {
              transform: scale(0.7);
            }
            60% {
              transform: scale(1.3);
            }
            100% {
              transform: scale(1);
            }
          }

          .like-btn.animate .ripple {
            animation: ripple-out 0.5s ease forwards;
          }

          @keyframes ripple-out {
            from {
              transform: scale(0);
              opacity: 1;
            }
            to {
              transform: scale(3);
              opacity: 0;
            }
          }

          .like-btn.animate .particle {
            animation: particle-out 0.6s ease forwards;
          }

          @keyframes particle-out {
            0% {
              transform: translate(-50%, -50%) scale(0);
            }
            50% {
              transform: translate(-50%, -80px) scale(1);
            }
            100% {
              transform: translate(-50%, -120px) scale(0);
              opacity: 0;
            }
          }

          @keyframes bump {
            50% {
              transform: scale(1.3);
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-bump {
            animation: bump 0.3s ease;
          }

          /* Fade In Card */
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease forwards;
          }
        `}</style>
      </div>
    </>
  );
}
