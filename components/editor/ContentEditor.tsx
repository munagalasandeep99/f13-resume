import React, { useState } from 'react';
import { Resume, WorkExperience, Education, CustomSection } from '../../types';
import Accordion from '../ui/Accordion';
import RichTextField from '../ui/RichTextField';

interface ContentEditorProps {
  resume: Resume;
  onUpdate: (resume: Resume) => void;
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <input {...props} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
    </div>
);

const ContentEditor: React.FC<ContentEditorProps> = ({ resume, onUpdate }) => {
    const [newSkill, setNewSkill] = useState('');

    const handleGenericChange = (section: keyof Resume, value: any) => {
        onUpdate({ ...resume, [section]: value });
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleGenericChange('contact', { ...resume.contact, [e.target.name]: e.target.value });
    };
    
    // --- Work Experience ---
    const handleExperienceChange = (id: string, field: keyof WorkExperience, value: string) => {
        const updated = resume.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp);
        handleGenericChange('experience', updated);
    };
    const addExperience = () => {
        const newExp: WorkExperience = { id: crypto.randomUUID(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' };
        handleGenericChange('experience', [...resume.experience, newExp]);
    };
    const deleteExperience = (id: string) => {
        handleGenericChange('experience', resume.experience.filter(exp => exp.id !== id));
    };

    // --- Education ---
    const handleEducationChange = (id: string, field: keyof Education, value: string) => {
        const updated = resume.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
        handleGenericChange('education', updated);
    };
    const addEducation = () => {
        const newEdu: Education = { id: crypto.randomUUID(), school: '', degree: '', location: '', startDate: '', endDate: '' };
        handleGenericChange('education', [...resume.education, newEdu]);
    };
    const deleteEducation = (id: string) => {
        handleGenericChange('education', resume.education.filter(edu => edu.id !== id));
    };

    // --- Skills ---
    const addSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
            handleGenericChange('skills', [...resume.skills, newSkill.trim()]);
            setNewSkill('');
        }
    };
    const deleteSkill = (skill: string) => {
        handleGenericChange('skills', resume.skills.filter(s => s !== skill));
    };

    // --- Custom Sections ---
    const handleCustomSectionChange = (id: string, field: keyof CustomSection, value: string) => {
        const updated = resume.customSections.map(sec => sec.id === id ? { ...sec, [field]: value } : sec);
        handleGenericChange('customSections', updated);
    };
    const addCustomSection = () => {
        const newSec: CustomSection = { id: crypto.randomUUID(), title: 'New Section', content: '' };
        handleGenericChange('customSections', [...resume.customSections, newSec]);
    };
    const deleteCustomSection = (id: string) => {
        handleGenericChange('customSections', resume.customSections.filter(sec => sec.id !== id));
    };

  return (
    <div className="space-y-4">
      <Accordion title="Contact Information" initialOpen={true}>
          <div className="space-y-4 p-4">
              <Input label="Full Name" name="name" value={resume.contact.name} onChange={handleContactChange} />
              <Input label="Email" name="email" value={resume.contact.email} onChange={handleContactChange} />
              <Input label="Phone Number" name="phone" value={resume.contact.phone} onChange={handleContactChange} />
              <Input label="Address" name="address" value={resume.contact.address} onChange={handleContactChange} />
              <Input label="LinkedIn Profile" name="linkedin" value={resume.contact.linkedin} onChange={handleContactChange} />
              <Input label="Website/Portfolio" name="website" value={resume.contact.website} onChange={handleContactChange} />
          </div>
      </Accordion>
      <Accordion title="Professional Summary" initialOpen={true}>
        <div className="p-4 space-y-2">
            <RichTextField htmlContent={resume.summary} onHtmlChange={(html) => onUpdate({...resume, summary: html})} />
        </div>
      </Accordion>
      <Accordion title="Work Experience">
          <div className="p-4 space-y-4">
              {resume.experience.map(exp => (
                  <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
                      <Input label="Job Title" value={exp.jobTitle} onChange={e => handleExperienceChange(exp.id, 'jobTitle', e.target.value)} />
                      <Input label="Company" value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} />
                      <Input label="Location" value={exp.location} onChange={e => handleExperienceChange(exp.id, 'location', e.target.value)} />
                      <div className="grid grid-cols-2 gap-4">
                         <Input label="Start Date" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
                         <Input label="End Date" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
                      </div>
                      <div>
                          <label className="text-sm font-medium text-slate-600">Description</label>
                          <RichTextField htmlContent={exp.description} onHtmlChange={html => handleExperienceChange(exp.id, 'description', html)} />
                      </div>
                      <button onClick={() => deleteExperience(exp.id)} className="text-sm text-red-500 hover:text-red-700">Remove Experience</button>
                  </div>
              ))}
              <button onClick={addExperience} className="w-full px-4 py-2 text-sm font-semibold rounded-md border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-500 hover:text-indigo-500">+ Add Experience</button>
          </div>
      </Accordion>
      <Accordion title="Education">
          <div className="p-4 space-y-4">
              {resume.education.map(edu => (
                  <div key={edu.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
                      <Input label="School/University" value={edu.school} onChange={e => handleEducationChange(edu.id, 'school', e.target.value)} />
                      <Input label="Degree/Field of Study" value={edu.degree} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} />
                      <Input label="Location" value={edu.location} onChange={e => handleEducationChange(edu.id, 'location', e.target.value)} />
                      <div className="grid grid-cols-2 gap-4">
                         <Input label="Start Date" value={edu.startDate} onChange={e => handleEducationChange(edu.id, 'startDate', e.target.value)} />
                         <Input label="End Date" value={edu.endDate} onChange={e => handleEducationChange(edu.id, 'endDate', e.target.value)} />
                      </div>
                      <button onClick={() => deleteEducation(edu.id)} className="text-sm text-red-500 hover:text-red-700">Remove Education</button>
                  </div>
              ))}
              <button onClick={addEducation} className="w-full px-4 py-2 text-sm font-semibold rounded-md border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-500 hover:text-indigo-500">+ Add Education</button>
          </div>
      </Accordion>
       <Accordion title="Skills">
          <div className="p-4 space-y-4">
             <div className="flex flex-wrap gap-2">
                 {resume.skills.map(skill => (
                     <span key={skill} className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                         {skill}
                         <button onClick={() => deleteSkill(skill)} className="ml-2 text-indigo-500 hover:text-indigo-700">×</button>
                     </span>
                 ))}
             </div>
             <form onSubmit={addSkill} className="flex gap-2">
                 <Input label="New Skill" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="e.g. JavaScript" className="flex-grow"/>
                 <button type="submit" className="self-end px-4 py-2 text-sm font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add</button>
             </form>
          </div>
      </Accordion>
      <Accordion title="Custom Sections">
           <div className="p-4 space-y-4">
              {resume.customSections.map(sec => (
                  <div key={sec.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
                      <Input label="Section Title" value={sec.title} onChange={e => handleCustomSectionChange(sec.id, 'title', e.target.value)} />
                       <div>
                          <label className="text-sm font-medium text-slate-600">Content</label>
                          <RichTextField htmlContent={sec.content} onHtmlChange={html => handleCustomSectionChange(sec.id, 'content', html)} />
                      </div>
                      <button onClick={() => deleteCustomSection(sec.id)} className="text-sm text-red-500 hover:text-red-700">Remove Section</button>
                  </div>
              ))}
              <button onClick={addCustomSection} className="w-full px-4 py-2 text-sm font-semibold rounded-md border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-500 hover:text-indigo-500">+ Add Custom Section</button>
          </div>
      </Accordion>
    </div>
  );
};

export default ContentEditor;