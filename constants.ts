
import { Resume, TemplateId } from './types';

export const initialResumeData: Omit<Resume, 'id' | 'template' | 'title'> = {
  theme: {
    primaryColor: 'bg-blue-600',
    accentColor: 'bg-blue-500'
  },
  contact: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/yourprofile',
    website: 'yourportfolio.com',
    address: 'Your City, Your State',
  },
  summary: 'A brief summary of your career objectives and qualifications.',
  experience: [],
  education: [],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  customSections: [],
};

export const TEMPLATES = [
  { id: TemplateId.Modern, name: 'Modern', imageUrl: 'https://picsum.photos/seed/modern/400/500' },
  { id: TemplateId.Minimalist, name: 'Minimalist', imageUrl: 'https://picsum.photos/seed/minimalist/400/500' },
  { id: TemplateId.Executive, name: 'Executive', imageUrl: 'https://picsum.photos/seed/executive/400/500' },
  { id: TemplateId.CreativeSplit, name: 'Creative Split', imageUrl: 'https://picsum.photos/seed/creative/400/500' },
];

export const THEME_COLORS = {
  primary: [
    { name: 'Blue', value: 'bg-blue-600' },
    { name: 'Green', value: 'bg-green-600' },
    { name: 'Indigo', value: 'bg-indigo-600' },
    { name: 'Slate', value: 'bg-slate-800' },
  ],
  accent: [
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Teal', value: 'bg-teal-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Orange', value: 'bg-orange-500' },
  ],
};