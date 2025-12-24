'use client';

import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { setCanvas } from './editorStore';

export default function CanvasStage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    });

    setCanvas(canvas);

    return () => {
      canvas.dispose();
      setCanvas(null as any);
    };
  }, []);

  return (
    <div className="bg-white shadow-lg">
      <canvas ref={canvasRef} />
    </div>
  );
}
