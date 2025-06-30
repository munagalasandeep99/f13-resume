
import React from 'react';
import { Resume, TemplateId } from '../../types';
import { TEMPLATES, THEME_COLORS } from '../../constants';

interface DesignEditorProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const ColorDot: React.FC<{ colorClass: string; isSelected: boolean; onClick: () => void }> = ({ colorClass, isSelected, onClick }) => (
    <button onClick={onClick} className={`w-8 h-8 rounded-full ${colorClass} transition-transform hover:scale-110 ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}></button>
);


const DesignEditor: React.FC<DesignEditorProps> = ({ resume, onUpdate }) => {
  const handleTemplateChange = (templateId: TemplateId) => {
    onUpdate({ ...resume, template: templateId });
  };

  const handleColorChange = (type: 'primaryColor' | 'accentColor', value: string) => {
      onUpdate({ ...resume, theme: { ...resume.theme, [type]: value } });
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Change Template</h3>
        <p className="text-sm text-slate-500 mb-4">Your content will be preserved.</p>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map(template => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`p-2 rounded-lg border-2 ${
                resume.template === template.id ? 'border-indigo-500' : 'border-transparent'
              }`}
            >
              <div className="aspect-[3/4] bg-slate-200 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500 px-1 text-center">{template.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Theme Colors</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Primary Color</h4>
            <div className="flex space-x-3">
                {THEME_COLORS.primary.map(color => (
                    <ColorDot key={color.value} colorClass={color.value} isSelected={resume.theme.primaryColor === color.value} onClick={() => handleColorChange('primaryColor', color.value)} />
                ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Accent Color</h4>
            <div className="flex space-x-3">
               {THEME_COLORS.accent.map(color => (
                    <ColorDot key={color.value} colorClass={color.value} isSelected={resume.theme.accentColor === color.value} onClick={() => handleColorChange('accentColor', color.value)} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
