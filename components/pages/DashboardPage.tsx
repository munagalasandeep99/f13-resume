
import React from 'react';
import { Resume } from '../../types';

interface DashboardPageProps {
  resumes: Resume[];
  onNewResume: () => void;
  onEditResume: (id: string) => void;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ resumes, onNewResume, onEditResume }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">My Resumes</h2>
        <p className="mt-1 text-slate-500">Create and manage your resumes that stand out.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <button
          onClick={onNewResume}
          className="aspect-[3/4] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300"
        >
          <PlusIcon className="w-12 h-12 mb-2" />
          <span className="font-medium">Create New Resume</span>
        </button>
        {resumes.map(resume => (
          <div 
            key={resume.id} 
            onClick={() => onEditResume(resume.id)}
            className="group relative aspect-[3/4] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img 
                src={`https://picsum.photos/seed/${resume.id}/400/533`} 
                alt={resume.title}
                className="w-full h-full object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-4">
                 <h3 className="text-white font-bold text-lg">{resume.title}</h3>
                 <p className="text-white/80 text-sm">{resume.template}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;