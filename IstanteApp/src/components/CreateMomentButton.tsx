import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CreateMomentButtonProps {
  onCreateMoment: () => void;
}

const CreateMomentButton: React.FC<CreateMomentButtonProps> = ({ onCreateMoment }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onCreateMoment}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-20 right-6 md:top-20 md:right-6 z-40 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500/80 via-purple-600/80 to-indigo-700/80 backdrop-blur hover:from-purple-400/90 hover:via-purple-500/90 hover:to-indigo-600/90 text-white rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 dark:shadow-purple-500/10 dark:hover:shadow-purple-500/20"
    >
      <Plus className="w-6 h-6" />
      
      {isHovered && (
        <span className="absolute right-16 bg-black/80 dark:bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
          Create Moment
        </span>
      )}
    </button>
  );
};

export default CreateMomentButton;