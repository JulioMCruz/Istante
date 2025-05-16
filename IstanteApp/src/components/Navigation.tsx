import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, PlusSquare, Wallet, Settings, User, FileSignature, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const mobileNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: PlusSquare, label: 'Create', path: '/create' },
    { icon: User, label: 'My Account', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const mobileMenuItems = [
    { icon: Wallet, label: 'My Collection', path: '/collection' },
    { icon: FileSignature, label: 'My Requests', path: '/requests' }
  ];

  const desktopNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Wallet, label: 'My Collection', path: '/collection' },
    { icon: PlusSquare, label: 'Create', path: '/create' },
    { icon: FileSignature, label: 'My Requests', path: '/requests' },
    { icon: User, label: 'My Account', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const renderMobileNavItem = (item: typeof mobileNavItems[0]) => {
    const commonClasses = `flex flex-col items-center justify-center ${
      isActive(item.path)
        ? 'text-purple-400'
        : 'text-gray-400 hover:text-purple-300'
    }`;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${commonClasses} py-2 px-4`}
      >
        <item.icon className="w-6 h-6 mb-1" />
        <span className="text-[10px] font-medium">{item.label}</span>
      </Link>
    );
  };

  const renderDesktopNavItem = (item: typeof desktopNavItems[0]) => {
    const commonClasses = "flex items-center w-full px-4 py-3 rounded-lg transition-colors";

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${commonClasses} ${
          isActive(item.path)
            ? 'bg-purple-500/20 text-purple-400'
            : 'text-gray-400 hover:bg-gray-800/50 hover:text-purple-300'
        }`}
      >
        <item.icon className="w-6 h-6" />
        <span className="ml-3">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-400 hover:text-gray-200"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Slide-out Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm">
          <div className="pt-20 px-4">
            {mobileMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors mb-2 ${
                  isActive(item.path)
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-purple-300'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 md:hidden z-30">
        <div className="flex items-center justify-around py-1">
          {mobileNavItems.map(renderMobileNavItem)}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 flex-col pt-20 px-4">
        <div className="flex flex-col space-y-2">
          {desktopNavItems.map(renderDesktopNavItem)}
        </div>
      </nav>
    </>
  );
};

export default Navigation;