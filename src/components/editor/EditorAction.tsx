'use client';

import { useState } from 'react';

import ExportModal from './ExportModal';

import Link from 'next/link';
import { saveCanvas } from './SaveCanvas';
import { useAuth } from '../auth/useAuth';

export default function EditorActions() {
  const { user } = useAuth();
  const [cardId, setCardId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    const id = await saveCanvas(user);
    setSaving(false);

    setCardId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          💾 {saving ? 'Saving...' : 'Save'}
        </button>

        {/* Export button แสดงเมื่อ save แล้ว */}
        {cardId && (
          <Link href={`/card/${cardId}`} className="px-4 py-2 border rounded">
            🖼 Export
          </Link>
        )}
      </div>

      {showModal && cardId && (
        <ExportModal cardId={cardId} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
