import React from 'react';
import { Resume, TemplateId } from '../../types';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CreativeSplitTemplate from './templates/CreativeSplitTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const renderTemplate = () => {
    switch (resume.template) {
      case TemplateId.Modern:
        return <ModernTemplate resume={resume} />;
      case TemplateId.Minimalist:
         return <MinimalistTemplate resume={resume} />;
      case TemplateId.Executive:
        return <ExecutiveTemplate resume={resume} />;
      case TemplateId.CreativeSplit:
        return <CreativeSplitTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="aspect-[8.5/11] w-full bg-white shadow-lg">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;