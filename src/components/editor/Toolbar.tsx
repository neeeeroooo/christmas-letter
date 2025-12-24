'use client';

import * as fabric from 'fabric';
import { getCanvas } from './editorStore';
import TextToolbar from './TextToolbar';

export default function Toolbar() {
  const addText = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const text = new fabric.Textbox('Merry Christmas 🎄', {
      left: 100,
      top: 100,
      fontSize: 32,
      fill: '#ff0000',
      fontFamily: 'Prompt',
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addAsset = async (src: string) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const img = await fabric.FabricImage.fromURL(src);

    img.scaleToWidth(120);
    img.left = 200;
    img.top = 150;

    canvas.add(img);
    canvas.setActiveObject(img);
  };

  const deleteObject = () => {
    const canvas = getCanvas();
    const obj = canvas?.getActiveObject();
    if (obj && canvas) {
      canvas.remove(obj);
    }
  };

  const uploadImage = async (file: File) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const canvas = getCanvas();
      if (!canvas) return;

      const img = await fabric.FabricImage.fromURL(reader.result as string);

      img.scaleToWidth(200);
      canvas.add(img);
      canvas.setActiveObject(img);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <button onClick={addText} className="editor-btn">
        📝
      </button>

      <button onClick={deleteObject} className="editor-btn">
        🗑
      </button>
      <input
        type="file"
        accept="image/*"
        hidden
        id="upload"
        onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
      />

      <label htmlFor="upload" className="editor-btn cursor-pointer">
        🖼
      </label>
    </>
  );
}
