'use client';

import * as fabric from 'fabric';
import { getCanvas } from './editorStore';

const assets = [
  '/assets/tree.svg',
  '/assets/hat.svg',
  '/assets/gift.svg',
  '/assets/bell.svg',
  '/assets/bell2.svg',
  '/assets/snow.svg',
  '/assets/snowman.svg',
  '/assets/sock.svg',
  '/assets/leaf.svg',
];

export default function AssetPanel() {
  const add = async (src: string) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const img = await fabric.FabricImage.fromURL(src);
    img.scaleToWidth(100);

    canvas.add(img);
    canvas.setActiveObject(img);
  };

  return (
    <div className="flex gap-2 p-2">
      {assets.map((a) => (
        <img
          key={a}
          src={a}
          className="w-12 h-12 cursor-pointer"
          onClick={() => add(a)}
        />
      ))}
    </div>
  );
}
