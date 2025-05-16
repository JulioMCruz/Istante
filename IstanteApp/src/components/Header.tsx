import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Space for hamburger menu */}
            <div className="w-6 h-6 md:hidden"></div>
            
            {/* App name */}
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent ml-4 md:ml-0">
              Istante
            </Link>
          </div>

          {/* Slogan - Hidden on mobile */}
          <div className="hidden md:block">
            <p className="text-sm font-medium bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent italic">
              Moments made eternal, memories made true
            </p>
          </div>

          {/* Empty div for flex alignment */}
          <div className="w-[88px] md:w-[100px]"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;