import BalloonBoard from '@/components/FloatingBoard';
import FloatingBoard from '@/components/FloatingBoard';

import React from 'react';

export default function Page() {
  return (
    <BalloonBoard
      items={[
        <p className="text-red-500 font-bold text-lg">คิดถึงนะ</p>,
        <img src="/for/cat2.jpg" alt="Jin" width={'100%'} />,
        <p className="text-green-500 font-bold text-xl">คิดถึงมากๆ</p>,
        <p className="text-yellow-500 font-bold text-lg">สู้ๆนะ</p>,
        <img src="/for/jin.jpg" alt="Jin" width={'100%'} />,
        <p className="text-blue-500 font-bold text-lg">เป็นกำลังใจให้นะ</p>,
        <p className="text-pink-500 font-bold text-lg">รักนะ</p>,
        <img src="/for/cat1.jpg" alt="Jin" width={'100%'} />,
        <img src="/for/cat3.jpg" alt="Jin" width={'100%'} />,
        <img src="/for/hearth.svg" alt="Jin" width={'100%'} />,
      ]}
      maxBalloons={15} // จำนวนสูงสุดสุ่ม
      videoSrc="/for/merry.mp4"
    />
  );
}
