'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Confetti from 'react-confetti';
import Image from 'next/image';

const OPEN_SOUND = '/sounds/open.mp3';

interface ModernCuteChristmasCardProps {
  to?: string;
  message?: string;
  from?: string;
}

export default function CardForYou({
  to = "N'Jin",
  message = 'ใกล้สิ้นปีแล้วแวะมาอวยพรจากตรงนี้ก่อนเลย ขอให้หนูมีความสุขเยอะๆเลย ขอให้พบเจอแต่คนดีๆนะคะเป็นคนที่ถูกรักจากคนรอบข้างเสมอๆ และก็ขอบคุณที่เข้ามาในชีวิตพี่นะพี่มีความสุขในทุกๆวันเลยตั้งแต่เจอหนู ทั้งๆที่พึ่งรู้จักกันเองแต่พี่อยากบอกว่าพี่จะตั้งใจรักหนูนะ ตั้งใจทำทุกๆอย่างเลย แล้วก็พี่จะรอให้ถึงวันนั้นนะคะ เพ้อเยอะแล้ว 555555 สุดท้ายแบบสรุปละก็คือขอให้หนูมีความสุขมากๆ มีไรคิดมากก็มาบอกพี่ได้เสมอพี่จะอยู่ตรงนี้เสมอเลย ติวสอบก็ขอให้ผ่านไปด้วยดี ผ่านชิวๆเลยยยยย สุขสันต์วันคริสต์มาส! จิ้มการ์ดด้วยนะมีอะไรต่ออีกนิด ✨',
  from = "P'Palm",
}: ModernCuteChristmasCardProps) {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [cardRendered, setCardRendered] = useState(false);
  const [snowflakes, setSnowflakes] = useState<
    {
      id: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP Refs for present
  const boxBodyRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const ribbonRef = useRef<SVGGElement>(null);
  const topRef = useRef<SVGRectElement>(null);
  const topShadowRef = useRef<SVGRectElement>(null);
  const ribbonSideRef = useRef<SVGRectElement>(null);
  const socialRef = useRef<SVGGElement>(null);

  // Initialize snowflakes
  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);

  // Hover animation for present
  const handleHover = () => {
    if (opened || animating) return;

    gsap
      .timeline()
      .to(boxBodyRef.current, {
        scaleX: 0.8,
        y: -20,
        duration: 0.5,
        transformOrigin: 'bottom center',
        ease: 'power4.inOut',
      })
      .to(boxBodyRef.current, {
        scaleX: 1,
        y: 0,
        duration: 0.2,
        ease: 'bounce.out',
      })
      .to(
        shadowRef.current,
        {
          scaleX: 0.8,
          duration: 0.5,
          transformOrigin: 'bottom center',
          ease: 'power4.inOut',
        },
        0,
      )
      .to(
        shadowRef.current,
        { scaleX: 1, duration: 0.2, ease: 'bounce.out' },
        0.5,
      );
  };

  const handleHoverCard = () => {
    // GSAP timeline
    const tl = gsap.timeline();

    // shake การ์ด
    tl.to(cardRef.current, {
      x: -10,
      rotation: -5, // หมุนซ้าย
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
    }).to(cardRef.current, {
      x: 0,
      rotation: 0, // กลับสู่ศูนย์
      duration: 0.05,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // เพิ่ม effect bounce ของ shadow
    tl.to(
      shadowRef.current,
      {
        scaleX: 0.9,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
        transformOrigin: 'bottom center',
        ease: 'power1.inOut',
      },
      0,
    ).to(shadowRef.current, { scaleX: 1, duration: 0.05 }, 0.6);
  };

  // Click → Open Present animation
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (opened || animating) return;

    setAnimating(true);
    const audio = new Audio(OPEN_SOUND);
    audio.play();

    gsap
      .timeline()
      .to(ribbonRef.current, {
        yPercent: 252,
        duration: 0.4,
        ease: 'power4.inOut',
      })
      .to(
        topRef.current,
        { yPercent: -80, duration: 0.4, ease: 'power4.out' },
        0,
      )
      .to(topShadowRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
      .to(
        ribbonSideRef.current,
        { scaleY: 0.3, transformOrigin: 'bottom center', duration: 0.4 },
        0.2,
      )
      .to(
        topRef.current,
        {
          rotation: -90,
          transformOrigin: 'left center',
          duration: 0.4,
          ease: 'power4.inOut',
        },
        0,
      )
      .to(
        topRef.current,
        { yPercent: 400, duration: 0.3, ease: 'bounce.out' },
        0.4,
      )
      .to(
        topRef.current,
        { rotation: -180, duration: 0.4, ease: 'power4.in' },
        0.7,
      )
      .to(
        socialRef.current,
        {
          scale: 1.4,
          yPercent: -130,
          duration: 0.6,
          transformOrigin: 'top center',
          ease: 'power4.inOut',
        },
        '-=0.4',
      )
      .call(() => {
        setOpened(true); // เปิด card
        setAnimating(false);
        setShowConfetti(true);
        setCardRendered(true); // บอกว่ามี DOM ของ card แล้ว

        // Card scale animation when appears
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          );
        }
      });
  };
  // แล้วใช้ useEffect animate card
  useEffect(() => {
    if (cardRendered && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      );
    }
  }, [cardRendered]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-white to-green-50 overflow-hidden">
      {/* Snow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((flake) => (
          <Image
            key={flake.id}
            src="/assets/snow.svg"
            alt="snow"
            width={flake.size}
            height={flake.size}
            className="absolute top-[-10%]"
            style={{
              left: `${flake.left}%`,
              animation: `fall ${flake.duration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      {!opened ? (
        // SVG Present
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 270.1 140.1"
          id="xmas"
        >
          <ellipse
            cx="188.2"
            cy="117.3"
            rx="81.8"
            ry="22.8"
            fill="#81572A"
            ref={shadowRef}
          />
          <g
            ref={boxBodyRef}
            onMouseEnter={handleHover}
            onClick={handleOpen}
            style={{ cursor: 'pointer' }}
          >
            <g ref={socialRef}>
              <circle cx="182.3" cy="96.3" r="18.5" fill="#FFF" />
            </g>
            <rect x="146.8" y="72" width="66.2" height="49.5" fill="#D53938" />
            <rect
              x="146.8"
              y="72.7"
              width="66.2"
              height="3.6"
              fill="#B6282E"
              ref={topShadowRef}
            />
            <rect
              x="138"
              y="57.9"
              width="83.9"
              height="15.1"
              fill="#E85E4D"
              ref={topRef}
            />
            <rect
              x="185"
              y="57.5"
              width="10.4"
              height="64"
              fill="#FCB51D"
              ref={ribbonSideRef}
            />
            <g ref={ribbonRef}>
              <polygon
                points="190.7 57.2 175.9 40.8 164.8 52.7 184.4 63.6"
                fill="#FCB51D"
              />
              <polygon
                points="184.4 63.5 163.9 61.1 164.8 52.6"
                fill="#B61F2B"
              />
              <polygon
                points="190.5 57.3 204.6 40.2 216.2 51.5 197.2 63.4"
                fill="#FCB51D"
              />
              <polygon points="197.2 63.4 217.5 60 216.2 51.5" fill="#B61F2B" />
            </g>
          </g>
        </svg>
      ) : (
        <div
          ref={cardRef}
          onClick={() => {
            if (to === "N'Jin") {
              window.location.href = '/card-for-you/click';
            }
          }}
          onMouseEnter={handleHoverCard}
          className="card-border relative w-full max-w-4xl h-[650px] sm:h-[700px] rounded-3xl bg-linear-to-br from-red-50 via-white to-green-50 shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-visible p-10 flex flex-col items-center justify-center opacity-0 scale-50"
        >
          {/* Hat overlapping outside the card */}
          <div className="absolute -top-40 z-50 -left-30 -rotate-20">
            <Image src="/assets/hat.svg" alt="hat" width={350} height={350} />
          </div>

          {/* Decorative dots inside the card */}
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 6 + 2; // 2px - 8px
            const top = Math.random() * 100; // %
            const left = Math.random() * 100; // %
            const colorOptions = [
              '#FFD700',
              '#FF6B6B',
              '#6BCB77',
              '#4D96FF',
              '#FFB6C1',
            ];
            const color =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            return (
              <div
                key={i}
                className="absolute rounded-full opacity-70"
                style={{
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                  backgroundColor: color,
                }}
              />
            );
          })}

          {/* Decorations inside the card */}
          <Image
            src="/assets/tree.svg"
            alt="tree"
            width={450}
            height={450}
            className="absolute -bottom-10 -right-40 animate-bounce-slow z-15"
          />

          {/* Content */}
          <div className="relative z-30 text-center px-6 sm:px-8 font-christmas bg-gray-50/40 rounded-2xl">
            <h1 className="text-3xl sm:text-6xl font-extrabold text-red-400 mb-4 drop-shadow-md">
              Merry Christmas
            </h1>
            <p className="text-lg sm:text-2xl text-gray-700 mb-6">
              To <span className="font-bold text-gray-800">{to}</span>
            </p>
            <p className="text-base sm:text-xl text-gray-800 leading-relaxed mb-8">
              {message}
            </p>
            <div className="w-20 h-1 bg-red-400 rounded-full mx-auto mb-6 shadow-md" />
            <p className="text-lg text-gray-500 italic">{from}</p>
          </div>
        </div>
      )}
    </div>
  );
}
