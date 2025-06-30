
import React, { useState } from 'react';
import { Resume } from '../../types';
import ContentEditor from './ContentEditor';
import DesignEditor from './DesignEditor';

interface EditorControlsProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const EditorControls: React.FC<EditorControlsProps> = ({ resume, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  return (
    <div className="bg-white rounded-xl shadow-lg p-1.5">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`w-1/2 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'content'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`w-1/2 py-3 text-sm font-semibold transition-colors ${
            activeTab === 'design'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Design
        </button>
      </div>
      <div className="p-4 sm:p-6">
        {activeTab === 'content' ? (
          <ContentEditor resume={resume} onUpdate={onUpdate} />
        ) : (
          <DesignEditor resume={resume} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
};

export default EditorControls;
