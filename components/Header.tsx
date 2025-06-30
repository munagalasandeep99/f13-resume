import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  isAuthenticated: boolean;
  user: {
    given_name?: string;
    family_name?: string;
    email?: string;
  } | null;
  onLogout: () => void;
  onDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout, onDashboardClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const getInitials = () => {
    if (!user) return 'U';
    const firstNameInitial = user.given_name?.[0] || '';
    const lastNameInitial = user.family_name?.[0] || '';
    if (firstNameInitial && lastNameInitial) {
      return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
    }
    return (user.email?.[0] || 'U').toUpperCase();
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {isAuthenticated ? (
            <>
              {/* Left Side: Branding */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={onDashboardClick}>ProResume</h1>
              </div>

              {/* Right Side: Navigation & Profile */}
              <div className="flex items-center space-x-6">
                <button onClick={onDashboardClick} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Dashboard
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    {getInitials()}
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={() => {
                            onLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Unauthenticated: Brand on the left
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={onDashboardClick}>ProResume</h1>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
