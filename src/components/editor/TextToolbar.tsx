'use client';

import { getCanvas } from './editorStore';
import { fonts } from './fonts';

export default function TextToolbar() {
  const changeColor = (color: string) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const active = canvas.getActiveObject();

    if (!active || !('set' in active)) return;

    // รองรับ Text, IText, Textbox
    active.set('fill', color);
    canvas.renderAll();
  };
  const updateText = (props: Record<string, any>) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== 'textbox') return;

    obj.set(props);
    canvas.renderAll();
  };

  const changeCanvasBg = (color: string) => {
    const canvas = getCanvas();
    if (!canvas) return;

    canvas.backgroundColor = color;
    canvas.renderAll();
  };

  return (
    <div className="bg-white rounded gap-2 p-2 flex items-center">
      {/* Font */}
      <select
        onChange={(e) => updateText({ fontFamily: e.target.value })}
        className="border px-2 py-1 rounded"
      >
        {fonts.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
      {/* Color */}
      <div className="flex items-center gap-2">
        <label>Text Color: </label>
        <input type="color" onChange={(e) => changeColor(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Background</span>
        <input type="color" onChange={(e) => changeCanvasBg(e.target.value)} />
      </div>
    </div>
  );
}
