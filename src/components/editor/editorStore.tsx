import * as fabric from 'fabric';

let canvas: fabric.Canvas | null = null;

export const setCanvas = (c: fabric.Canvas) => {
  canvas = c;
};

export const getCanvas = () => canvas;
