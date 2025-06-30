import React from 'react';
import { Resume } from '../../../types';

interface TemplateProps {
  resume: Resume;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; titleClass?: string;}> = ({ title, children, className, titleClass }) => (
    <div className={className}>
        <h2 className={`text-base font-bold uppercase tracking-widest pb-1 mb-2 border-b-2 ${titleClass}`}>{title}</h2>
        {children}
    </div>
);


const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { contact, theme, summary, experience, education, skills, customSections } = resume;

  return (
    <div className="w-full h-full bg-white text-slate-800 text-[10px] leading-snug font-sans flex">
      {/* Left Column (Sidebar) */}
      <aside className={`${theme.primaryColor} text-white p-6 w-1/3 flex flex-col`}>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-wider">{contact.name.toUpperCase()}</h1>
          </div>
          
          <div className="mt-8 space-y-6">
              <Section title="Contact" titleClass="border-white/50" className="space-y-2 text-sm">
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                  <p>{contact.address}</p>
                  <p>{contact.linkedin}</p>
                  <p>{contact.website}</p>
              </Section>
              
              {skills.length > 0 && (
                  <Section title="Skills" titleClass="border-white/50">
                      <ul className="list-disc list-inside text-sm space-y-1">
                          {skills.map(skill => <li key={skill}>{skill}</li>)}
                      </ul>
                  </Section>
              )}
          </div>
      </aside>

      {/* Right Column (Main Content) */}
      <main className="w-2/3 p-8">
          {summary && (
              <Section title="Professional Summary" titleClass={`border-slate-400 text-slate-800`} className="mb-6">
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: summary }} />
              </Section>
          )}

          {experience.length > 0 && (
              <Section title="Work Experience" titleClass={`border-slate-400 text-slate-800`} className="mb-6">
                  {experience.map(exp => (
                      <div key={exp.id} className="mb-4">
                          <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                              <p>{exp.company} | {exp.location}</p>
                              <p>{exp.startDate} - {exp.endDate}</p>
                          </div>
                          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
                      </div>
                  ))}
              </Section>
          )}

          {education.length > 0 && (
               <Section title="Education" titleClass={`border-slate-400 text-slate-800`} className="mb-6">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                             <h3 className="font-bold text-sm">{edu.degree}</h3>
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <p>{edu.school}, {edu.location}</p>
                                <p>{edu.startDate} - {edu.endDate}</p>
                            </div>
                        </div>
                    ))}
                </Section>
          )}

          {customSections.map(sec => (
                <Section title={sec.title} key={sec.id} titleClass={`border-slate-400 text-slate-800`} className="mb-6">
                   <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sec.content }} />
                </Section>
          ))}
      </main>
    </div>
  );
};

export default ExecutiveTemplate;