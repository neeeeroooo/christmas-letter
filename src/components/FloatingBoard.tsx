'use client';
import React, { useEffect, useState } from 'react';

interface BalloonItem {
  id: number;
  content: React.ReactNode;
  x: number;
  size: number;
  speed: number;
  delay: number;
}

interface BalloonBoardProps {
  items: React.ReactNode[];
  maxBalloons?: number;
  videoSrc?: string;
}

export default function BalloonBoard({
  items,
  maxBalloons = 10,
  videoSrc,
}: BalloonBoardProps) {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [showModal, setShowModal] = useState<boolean>(!!videoSrc);
  const [videoKey, setVideoKey] = useState<number>(0); // เปลี่ยน key เพื่อเล่นวิดีโอซ้ำ

  const generateBalloons = () => {
    const totalBalloons = Math.floor(Math.random() * maxBalloons) + 1;
    const newBalloons: BalloonItem[] = Array.from({
      length: totalBalloons,
    }).map((_, index) => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      return {
        id: index,
        content: randomItem,
        x: Math.random() * 90,
        size: 50 + Math.random() * 50,
        speed: 5 + Math.random() * 5,
        delay: Math.random() * 2,
      };
    });
    setBalloons(newBalloons);
  };

  // เล่นลูกโป่งครั้งแรกอัตโนมัติ
  useEffect(() => {
    generateBalloons();
  }, [items, maxBalloons]);

  return (
    <div className="relative w-full h-screen bg-pink-100 overflow-hidden">
      {/* ปุ่มเล่นวิดีโอซ้ำ */}
      {videoSrc && !showModal && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <button
            onClick={() => {
              setVideoKey((prev) => prev + 1);
              setShowModal(true);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            ▶️ Play Video Again
          </button>
          <button
            onClick={() => {
              window.location.href = '/card-for-you';
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            🏠 Back to Card
          </button>
        </div>
      )}

      {/* Modal วิดีโอ */}
      {showModal && videoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden max-w-xl w-full relative">
            <video
              key={videoKey} // เปลี่ยน key เพื่อเล่นวิดีโอใหม่
              src={videoSrc}
              autoPlay
              controls
              onEnded={() => setShowModal(false)}
              className="w-full h-auto"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* ลูกโป่ง */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
            bottom: 0,
            width: `${balloon.size}px`,
            height: `${balloon.size}px`,
            animation: `floatUp ${balloon.speed}s linear infinite`,
            animationDelay: `${balloon.delay}s`,
          }}
        >
          {balloon.content}
        </div>
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(120px);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
