import React from 'react';
import { Resume } from '../../../types';

interface TemplateProps {
  resume: Resume;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
        <h2 className="text-lg font-bold border-b-2 border-slate-300 pb-1 mb-2 uppercase tracking-wider">{title}</h2>
        {children}
    </div>
);


const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, theme, summary, experience, education, skills, customSections } = resume;

  return (
    <div className="w-full h-full bg-white text-slate-800 text-[10px] leading-snug font-sans p-8">
      {/* Header */}
      <div className={`p-8 text-white absolute top-0 left-0 right-0 ${theme.primaryColor}`}>
        <h1 className="text-4xl font-bold tracking-wide">{contact.name.toUpperCase()}</h1>
        <div className="flex justify-between items-center mt-2 text-xs">
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <span>{contact.linkedin}</span>
          <span>{contact.website}</span>
        </div>
      </div>
      
      {/* Spacer for fixed header */}
      <div className="h-[100px]"></div>

      <div className="space-y-6">
        {/* Professional Summary */}
        {summary && (
            <Section title="Professional Summary">
              <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: summary }} />
            </Section>
        )}
        
        {/* Main content split */}
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
                {/* Work Experience */}
                {experience.length > 0 && (
                    <Section title="Work Experience">
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                                <div className="flex justify-between text-slate-600 font-semibold">
                                    <p>{exp.company} - {exp.location}</p>
                                    <p>{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <div className="prose prose-sm max-w-none mt-1" dangerouslySetInnerHTML={{ __html: exp.description }} />
                            </div>
                        ))}
                    </Section>
                )}
                
                 {/* Education */}
                {education.length > 0 && (
                    <Section title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="font-bold text-sm">{edu.degree}</h3>
                                <div className="flex justify-between text-slate-600 font-semibold">
                                    <p>{edu.school}, {edu.location}</p>
                                     <p>{edu.startDate} - {edu.endDate}</p>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}
            </div>

            <div className="col-span-1 space-y-6">
                 {/* Skills */}
                {skills.length > 0 && (
                    <Section title="Skills">
                        <ul className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <li key={skill} className={`${theme.accentColor} text-white px-2 py-1 rounded-md text-xs`}>{skill}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                 {/* Custom Sections */}
                {customSections.map(sec => (
                    <Section title={sec.title} key={sec.id}>
                       <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sec.content }} />
                    </Section>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;