import React from 'react';
import { Resume } from '../../../types';

interface TemplateProps {
  resume: Resume;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; titleClass?: string;}> = ({ title, children, className, titleClass }) => (
    <div className={className}>
        <h2 className={`text-sm font-bold uppercase tracking-widest pb-1 mb-2 ${titleClass}`}>{title}</h2>
        {children}
    </div>
);


const CreativeSplitTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, theme, summary, experience, education, skills, customSections } = resume;

  return (
    <div className="w-full h-full bg-white text-slate-800 text-[10px] leading-snug font-sans p-8">
        {/* Header */}
        <header className={`border-b-4 ${theme.primaryColor.replace('bg-', 'border-')} pb-4 mb-6 text-center`}>
            <h1 className="text-4xl font-bold tracking-wider">{contact.name.toUpperCase()}</h1>
            <p className="text-lg font-light tracking-widest">{experience[0]?.jobTitle || 'Professional'}</p>
        </header>

        <div className="grid grid-cols-3 gap-8">
            {/* Main Column */}
            <main className="col-span-2 space-y-6">
                 {experience.length > 0 && (
                    <Section title="Work Experience" titleClass={`border-b-2 ${theme.primaryColor.replace('bg-', 'border-')}`}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <h3 className="font-bold text-sm">{exp.jobTitle}, {exp.company}</h3>
                                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                                    <p>{exp.location}</p>
                                    <p>{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                            </div>
                        ))}
                    </Section>
                )}

                {education.length > 0 && (
                    <Section title="Education" titleClass={`border-b-2 ${theme.primaryColor.replace('bg-', 'border-')}`}>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="font-bold text-sm">{edu.degree}</h3>
                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                    <p>{edu.school}, {edu.location}</p>
                                    <p>{edu.startDate} - {edu.endDate}</p>
                                </div>
                            </div>
                        ))}
                    </Section>
                )}
            </main>

            {/* Sidebar */}
            <aside className="col-span-1 space-y-6">
                <Section title="About Me" titleClass={`text-slate-800`}>
                     <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: summary }} />
                </Section>

                <Section title="Contact" titleClass={`text-slate-800`}>
                     <div className="space-y-1 text-xs">
                        <p><strong>P:</strong> {contact.phone}</p>
                        <p><strong>E:</strong> {contact.email}</p>
                        <p><strong>A:</strong> {contact.address}</p>
                        <p><strong>W:</strong> {contact.website}</p>
                        <p><strong>L:</strong> {contact.linkedin}</p>
                     </div>
                </Section>
                
                 {skills.length > 0 && (
                    <Section title="Skills" titleClass={`text-slate-800`}>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => <span key={skill} className={`${theme.accentColor} text-white px-2 py-1 rounded text-xs`}>{skill}</span>)}
                        </div>
                    </Section>
                 )}

                 {customSections.map(sec => (
                    <Section title={sec.title} key={sec.id} titleClass={`text-slate-800`}>
                       <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sec.content }} />
                    </Section>
                ))}
            </aside>
        </div>
    </div>
  );
};

export default CreativeSplitTemplate;