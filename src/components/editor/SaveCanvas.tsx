// components/editor/saveCanvas.ts
import { db } from '@/lib/firestore';
import { getCanvas } from './editorStore';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const saveCanvas = async (user: {
  uid: string;
  email: string | null;
}) => {
  const canvas = getCanvas();
  if (!canvas) throw new Error('Canvas not ready');

  const json = canvas.toJSON();

  const docRef = await addDoc(collection(db, 'cards'), {
    userId: user.uid,
    userEmail: user.email,
    canvas: json,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id; // 👈 สำคัญ
};
