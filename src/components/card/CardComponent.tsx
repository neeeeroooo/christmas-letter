'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firestore';

export default function CardComponent() {
  const params = useParams();
  const id = params?.id as string;

  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ กัน hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !id) return;

    const el = document.createElement('canvas');
    el.width = 600;
    el.height = 400;

    const canvas = new fabric.Canvas(el, {
      width: 600,
      height: 400,
      backgroundColor: '#fff',
    });

    canvasRef.current = canvas;

    const load = async () => {
      const snap = await getDoc(doc(db, 'cards', id));
      if (!snap.exists()) return;

      if (document.fonts) {
        await document.fonts.ready;
      }

      canvas.loadFromJSON(snap.data().canvas, () => {
        canvas.renderAll();

        const base64 = canvas.toDataURL({
          format: 'png',
          multiplier: 2,
        });

        setImageUrl(base64);
      });
    };

    load();

    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [mounted, id]);

  const download = () => {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL({
      format: 'png',
      multiplier: 2,
    });

    const a = document.createElement('a');
    a.href = url;
    a.download = 'card.png';
    a.click();
  };

  // ❗ สำคัญมาก: อย่า render อะไรก่อน mounted
  if (!mounted) return null;

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Christmas Card"
          className="rounded shadow max-w-full"
        />
      ) : (
        <p>Loading card...</p>
      )}

      {imageUrl && (
        <button
          onClick={download}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ⬇ Download PNG
        </button>
      )}
    </div>
  );
}
