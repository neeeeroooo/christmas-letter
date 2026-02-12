'use client';

import { useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function ValentineFull() {
  const [noGone, setNoGone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    gsap.to(button, {
      x: Math.random() * 400 - 200,
      y: -200,
      rotation: 720,
      scale: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => setNoGone(true),
    });
  };

  const handleYesClick = () => {
    setShowModal(true);
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h1>เอ่อ… ตามสัญญาเป็นแฟนกันนะคะ ?</h1>

        <div className="buttons">
          <button className="yes" onClick={handleYesClick}>
            ตกลง 💕
          </button>

          {!noGone && (
            <button className="no" onClick={handleNoClick}>
              ม่ายยยย 💔
            </button>
          )}
        </div>
      </div>

      {/* ================= Modal ================= */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              เย้ 💖 เราเป็นแฟนกันแล้วนะคะ!
            </h2>

            {/* ใส่รูปได้ตรงนี้ */}
            <div className="relative w-full h-100 mb-4">
              <Image
                src="/video.gif" // 👈 เปลี่ยนเป็นรูปของคุณใน public folder
                alt="Valentine"
                fill
                className="object-cover object-top rounded-xl"
                style={{ objectPosition: '20% -160px' }}
              />
            </div>

            <p className="text-gray-600 mb-6">
              ขอบคุณที่ตอบตกลงนะคะ
              ต่อจากนี้พี่ก็จะตั้งใจรักหนูเหมือนเดิมต่อไปน้าาา
              แล้วก็จะพยายามปรับตัวไปเรื่อย ๆ รวมถึงจะเป็นเซฟโซนให้หนูเสมอ ๆ เลย
              จะขออยู่เคียงข้างคอยดูแลไปตลอดเลยนะ และจะทำให้ดีที่สุดด้วย
              พี่รักหนูมากๆเลยนะคะ 💕
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:scale-105 transition"
            >
              ปิด 💘
            </button>
          </div>
        </div>
      )}

      {/* ================= Animations ================= */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
