
import React from 'react';
import { TemplateId } from '../../types';
import { TEMPLATES } from '../../constants';

interface TemplateSelectionPageProps {
  onSelectTemplate: (template: TemplateId) => void;
}

const TemplateSelectionPage: React.FC<TemplateSelectionPageProps> = ({ onSelectTemplate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">Choose Your Template</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Select a professionally designed template to start. You can change it anytime in the editor.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
              <img src={template.imageUrl} alt={template.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-slate-800">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;
