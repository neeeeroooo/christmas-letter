'use client';

import Toolbar from './Toolbar';
import CanvasStage from './CanvasStage';
import AssetPanel from './AssetPanel';
import TextToolbar from './TextToolbar';
import EditorActions from './EditorAction';

export default function CardEditor() {
  return (
    <div className="flex h-screen">
      {/* Toolbar */}
      <aside className="w-16 border-r bg-white flex flex-col items-center py-4 gap-4">
        <Toolbar />
      </aside>

      {/* Canvas */}
      <main className="flex-1 flex flex-col h-full items-center bg-gray-100">
        <div className="w-full gap-2 p-2 flex bg-white">
          <TextToolbar />
        </div>
        <AssetPanel />
        <CanvasStage />
        <EditorActions />
      </main>
    </div>
  );
}
