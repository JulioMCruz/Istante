import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follow system appearance'
    },
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Light theme for bright environments'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Dark theme for low-light environments'
    }
  ] as const;

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 md:pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Connected Wallet Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connected Wallet</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-medium">W</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">0xD8...F3a2</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Connected with MetaMask</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
              Disconnect
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  theme === option.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800'
                }`}
              >
                <option.icon className={`w-6 h-6 mb-3 ${
                  theme === option.value
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`} />
                <h3 className={`text-sm font-medium mb-1 ${
                  theme === option.value
                    ? 'text-purple-900 dark:text-purple-300'
                    : 'text-gray-900 dark:text-gray-300'
                }`}>
                  {option.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {option.description}
                </p>
                {theme === option.value && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;