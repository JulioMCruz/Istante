import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, PlusSquare, Wallet, Settings, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: PlusSquare, label: 'Create', path: '/create' },
    { icon: Wallet, label: 'My Collection', path: '/collection' },
    { icon: User, label: 'My Account', path: '/profile' }
  ];

  const renderMobileNavItem = (item: typeof navItems[0]) => {
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

  const renderDesktopNavItem = (item: typeof navItems[0]) => {
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
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 md:hidden z-50">
        <div className="flex items-center justify-around py-1">
          {navItems.map(renderMobileNavItem)}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 flex-col pt-20 px-4">
        <div className="flex flex-col space-y-2">
          {navItems.map(renderDesktopNavItem)}
        </div>

        <div className="mt-auto mb-6">
          <Link
            to="/settings"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive('/settings')
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-purple-300'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="ml-3">Settings</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;