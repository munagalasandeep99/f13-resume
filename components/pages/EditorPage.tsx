
import React, { useState, useCallback } from 'react';
import { Resume, TemplateId } from '../../types';
import EditorControls from '../editor/EditorControls';
import ResumePreview from '../editor/ResumePreview';

interface EditorPageProps {
  initialResume: Resume;
  onSave: (resume: Resume) => void;
  onBack: () => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ initialResume, onSave, onBack }) => {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = useCallback((updatedResume: Resume) => {
    setResume(updatedResume);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate async save
    setTimeout(() => {
        onSave(resume);
        setIsSaving(false);
    }, 500);
  };
  
  const handleDownloadPdf = () => {
    const { jsPDF } = window.jspdf;
    const previewElement = document.getElementById('resume-preview');
    if (previewElement) {
        window.html2canvas(previewElement, { scale: 3 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${resume.title.replace(/\s/g, '_')}.pdf`);
        });
    }
  };

  return (
    <div className="bg-slate-100">
      <div className="sticky top-16 z-20 bg-white/70 backdrop-blur-lg shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div>
                 <input 
                    type="text" 
                    value={resume.title}
                    onChange={(e) => setResume(r => ({...r, title: e.target.value}))}
                    className="text-xl font-bold text-slate-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md p-1 -m-1"
                />
            </div>
          <div className="flex items-center space-x-4">
            <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 text-sm font-semibold rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
            >
              {isSaving ? 'Saving...' : 'Save Resume'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <EditorControls resume={resume} onUpdate={handleUpdate} />
        </div>
        <div className="lg:col-span-2 sticky top-[130px]">
           <div id="resume-preview-container" className="bg-white rounded-lg shadow-lg p-2 overflow-y-auto max-h-[calc(100vh-160px)]">
             <div id="resume-preview">
                <ResumePreview resume={resume} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
