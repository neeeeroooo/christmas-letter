import BalloonBoard from '@/components/FloatingBoard';
import FloatingBoard from '@/components/FloatingBoard';

import React from 'react';

export default function Page() {
  return (
    <BalloonBoard
      items={[
        <p key={1} className="text-red-500 font-bold text-lg">
          คิดถึงนะ
        </p>,
        <img key={2} src="/for/cat2.jpg" alt="Jin" width={'100%'} />,
        <p key={3} className="text-green-500 font-bold text-xl">
          คิดถึงมากๆ
        </p>,
        <p key={4} className="text-yellow-500 font-bold text-lg">
          สู้ๆนะ
        </p>,
        <img key={5} src="/for/jin.jpg" alt="Jin" width={'100%'} />,
        <p key={6} className="text-blue-500 font-bold text-lg">
          เป็นกำลังใจให้นะ
        </p>,
        <p key={7} className="text-pink-500 font-bold text-lg">
          รักนะ
        </p>,
        <img key={8} src="/for/cat1.jpg" alt="Jin" width={'100%'} />,
        <img key={9} src="/for/cat3.jpg" alt="Jin" width={'100%'} />,
        <img key={10} src="/for/hearth.svg" alt="Jin" width={'100%'} />,
      ]}
      maxBalloons={15} // จำนวนสูงสุดสุ่ม
      videoSrc="/for/merry.mp4"
    />
  );
}
