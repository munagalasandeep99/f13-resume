
import React, { useState, useCallback, useEffect } from 'react';
import { Page, TemplateId, Resume } from './types';
import Header from './components/Header';
import LandingPage from './components/pages/LandingPage';
import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';
import TemplateSelectionPage from './components/pages/TemplateSelectionPage';
import EditorPage from './components/pages/EditorPage';
import VerificationPage from './components/pages/VerificationPage';
import { initialResumeData } from './constants';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';

// Configure AWS Amplify for Cognito
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_mNRdPxfMo',
      userPoolClientId: '74cgfmen18ceort0trc0ch3oc3',
    },
  },
});

type User = {
  username: string;
  given_name?: string;
  family_name?: string;
  email?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [verificationEmail, setVerificationEmail] = useState<string>('');
  
  const checkUser = useCallback(async () => {
    try {
      const cognitoUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser({ username: cognitoUser.username, ...attributes });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const initialCheck = async () => {
      await checkUser();
      setIsLoading(false);
    };
    initialCheck();
  }, [checkUser]);

  const handleLoginSuccess = useCallback(async () => {
    setIsLoading(true);
    const loggedIn = await checkUser();
    if(loggedIn) {
      setCurrentPage(Page.Dashboard);
    }
    setIsLoading(false);
  }, [checkUser]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      setCurrentPage(Page.Landing);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);
  
  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const navigateToVerification = useCallback((email: string) => {
    setVerificationEmail(email);
    setCurrentPage(Page.Verification);
  }, []);

  const handleVerificationSuccess = useCallback(() => {
    // After verification, user needs to sign in.
    alert('Verification successful! Please sign in.');
    setCurrentPage(Page.Auth);
    setVerificationEmail('');
  }, []);

  const startNewResume = useCallback(() => {
    setCurrentPage(Page.TemplateSelection);
  }, []);

  const selectTemplate = useCallback((templateId: TemplateId) => {
    const newResume: Resume = {
      ...initialResumeData,
      id: crypto.randomUUID(),
      template: templateId,
      title: 'Untitled Resume',
    };
    setEditingResume(newResume);
    setCurrentPage(Page.Editor);
  }, []);

  const editResume = useCallback((resumeId: string) => {
      const resumeToEdit = resumes.find(r => r.id === resumeId);
      if (resumeToEdit) {
          setEditingResume(resumeToEdit);
          setCurrentPage(Page.Editor);
      }
  }, [resumes]);

  const saveResume = useCallback((updatedResume: Resume) => {
    setResumes(prevResumes => {
      const exists = prevResumes.some(r => r.id === updatedResume.id);
      if (exists) {
        return prevResumes.map(r => r.id === updatedResume.id ? updatedResume : r);
      }
      return [...prevResumes, updatedResume];
    });
    setEditingResume(null);
    setCurrentPage(Page.Dashboard);
  }, []);

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <p className="text-lg text-slate-500">Loading...</p>
        </div>
      );
    }

    if (isAuthenticated) {
      switch (currentPage) {
        case Page.Dashboard:
          return <DashboardPage resumes={resumes} onNewResume={startNewResume} onEditResume={editResume} />;
        case Page.TemplateSelection:
          return <TemplateSelectionPage onSelectTemplate={selectTemplate} />;
        case Page.Editor:
          if (editingResume) {
            return <EditorPage initialResume={editingResume} onSave={saveResume} onBack={() => setCurrentPage(Page.Dashboard)} />;
          }
          // Fallback if no resume is being edited, redirect to dashboard.
          setCurrentPage(Page.Dashboard);
          return <DashboardPage resumes={resumes} onNewResume={startNewResume} onEditResume={editResume} />;
        case Page.Landing:
        case Page.Auth:
        case Page.Verification:
        default:
          // Authenticated users on public/unknown pages are redirected to the dashboard.
          setCurrentPage(Page.Dashboard);
          return <DashboardPage resumes={resumes} onNewResume={startNewResume} onEditResume={editResume} />;
      }
    } else {
      // Unauthenticated users
      switch (currentPage) {
        case Page.Landing:
          return <LandingPage onNavigateToAuth={() => navigateTo(Page.Auth)} />;
        case Page.Auth:
          return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigateToVerification={navigateToVerification} />;
        case Page.Verification:
          return <VerificationPage email={verificationEmail} onVerificationSuccess={handleVerificationSuccess} onBackToAuth={() => navigateTo(Page.Auth)} />;
        default:
          // Unauthenticated users on protected/unknown pages are redirected to the landing page.
          setCurrentPage(Page.Landing);
          return <LandingPage onNavigateToAuth={() => navigateTo(Page.Auth)} />;
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} onDashboardClick={() => navigateTo(Page.Dashboard)} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
