'use client';

import Link from 'next/link';

interface Props {
  cardId: string;
  onClose: () => void;
}

export default function ExportModal({ cardId, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[320px] space-y-4">
        <h2 className="text-lg font-semibold">🎉 Save สำเร็จ</h2>

        <p className="text-sm text-gray-600">
          คุณสามารถ export การ์ดเป็นรูปภาพได้
        </p>

        <div className="flex gap-2">
          <Link
            href={`/card/${cardId}`}
            className="flex-1 text-center bg-green-600 text-white py-2 rounded"
          >
            ไป Export
          </Link>

          <button onClick={onClose} className="flex-1 border rounded py-2">
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
