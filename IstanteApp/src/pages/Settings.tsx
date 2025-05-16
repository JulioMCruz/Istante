import React, { useState } from 'react';
import { Monitor, Moon, Sun, Mail, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

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

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Support</h2>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;