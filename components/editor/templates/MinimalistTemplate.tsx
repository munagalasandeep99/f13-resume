import React from 'react';
import { Resume } from '../../../types';

interface TemplateProps {
  resume: Resume;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
        <h2 className={`text-xl font-bold text-slate-800 border-b-2 border-slate-200 pb-1 mb-3 uppercase tracking-widest`}>{title}</h2>
        {children}
    </div>
);

const MinimalistTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, theme, summary, experience, education, skills, customSections } = resume;

  return (
    <div className="w-full h-full bg-white text-slate-700 text-[10.5px] leading-relaxed font-serif p-10">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold tracking-wider text-slate-800">{contact.name.toUpperCase()}</h1>
        <div className={`mt-3 text-xs text-slate-500 flex items-center justify-center space-x-4`}>
          <span>{contact.phone}</span>
          <span className={`${theme.accentColor} w-1.5 h-1.5 rounded-full`}></span>
          <span>{contact.email}</span>
          <span className={`${theme.accentColor} w-1.5 h-1.5 rounded-full`}></span>
          <span>{contact.linkedin}</span>
           {contact.website && <>
            <span className={`${theme.accentColor} w-1.5 h-1.5 rounded-full`}></span>
            <span>{contact.website}</span>
           </>}
        </div>
      </header>
      
      <main className="space-y-6">
        {summary && (
            <Section title="Summary">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: summary }} />
            </Section>
        )}
        
        {experience.length > 0 && (
            <Section title="Experience">
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-base font-bold text-slate-800">{exp.jobTitle}</h3>
                            <div className="text-xs font-semibold text-slate-500">{exp.startDate} - {exp.endDate}</div>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="font-semibold">{exp.company}</p>
                            <p className="text-xs text-slate-500">{exp.location}</p>
                        </div>
                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                    </div>
                ))}
            </Section>
        )}

        {education.length > 0 && (
            <Section title="Education">
                {education.map(edu => (
                    <div key={edu.id} className="mb-3 break-inside-avoid">
                         <div className="flex justify-between items-baseline">
                            <h3 className="text-base font-bold text-slate-800">{edu.degree}</h3>
                            <div className="text-xs font-semibold text-slate-500">{edu.startDate} - {edu.endDate}</div>
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="font-semibold">{edu.school}</p>
                            <p className="text-xs text-slate-500">{edu.location}</p>
                        </div>
                    </div>
                ))}
            </Section>
        )}
        
        {skills.length > 0 && (
            <Section title="Skills">
                <p className="text-slate-600">
                    {skills.join(' • ')}
                </p>
            </Section>
        )}

        {customSections.map(sec => (
            <Section title={sec.title} key={sec.id}>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sec.content }} />
            </Section>
        ))}
      </main>
    </div>
  );
};

export default MinimalistTemplate;