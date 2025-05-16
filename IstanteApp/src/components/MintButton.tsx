import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MintButtonProps {
  slideId: string;
  showDetails?: boolean;
}

const MintButton: React.FC<MintButtonProps> = ({ slideId, showDetails = false }) => {
  const [isMinting, setIsMinting] = useState(false);
  const navigate = useNavigate();
  
  const handleMint = () => {
    if (!showDetails) {
      navigate(`/moment/${slideId}`);
      return;
    }

    setIsMinting(true);
    
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      // Show success message or redirect
      alert(`Successfully minted slide ${slideId}!`);
    }, 2000);
  };
  
  return (
    <button
      onClick={handleMint}
      disabled={isMinting}
      className={`relative inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:from-purple-400 hover:via-purple-500 hover:to-purple-600 transition-all duration-200 disabled:opacity-70 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 dark:shadow-purple-500/10 dark:hover:shadow-purple-500/20 border border-purple-400/20 ${showDetails ? 'w-full' : ''}`}
    >
      {isMinting ? (
        <>
          <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Collecting...
        </>
      ) : (
        <>Collect Now</>
      )}
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
    </button>
  );
};

export default MintButton;