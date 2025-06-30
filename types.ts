export enum Page {
  Landing,
  Auth,
  Verification,
  Dashboard,
  TemplateSelection,
  Editor,
}

export enum TemplateId {
  Modern = 'Modern',
  Minimalist = 'Minimalist',
  Executive = 'Executive',
  CreativeSplit = 'CreativeSplit',
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  address: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location:string;
  startDate: string;
  endDate: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface Theme {
    primaryColor: string;
    accentColor: string;
}

export interface Resume {
  id: string;
  title: string;
  template: TemplateId;
  theme: Theme;
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  customSections: CustomSection[];
}

declare global {
  interface Window {
    jspdf: {
      jsPDF: new (options?: any) => any;
    };
    html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  }
}