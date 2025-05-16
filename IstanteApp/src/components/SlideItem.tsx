import React from 'react';
import { Slide } from '../types';
import MintButton from './MintButton';

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, isActive }) => {
  const handleFollow = () => {
    // In a real app, this would update the follow status in your backend
    console.log(`Toggle follow for user ${slide.author.id}`);
  };

  return (
    <div 
      className={`absolute inset-0 transition-all duration-500 ease-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <div className="relative h-full w-full">
        {/* Full screen image */}
        <img 
          src={slide.imageUrl} 
          alt={slide.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Content overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 md:pb-6 backdrop-blur-md bg-black/30">
            <div className="max-w-3xl mx-auto">
              {/* Author info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={slide.author.avatar}
                    alt={slide.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-white font-medium">@{slide.author.name}</span>
                </div>
                <button
                  onClick={handleFollow}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    slide.author.isFollowing
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {slide.author.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <h2 className="text-3xl font-bold mb-3 text-white">{slide.title}</h2>
              <p className="text-gray-200 mb-6 text-lg line-clamp-2">{slide.description}</p>
              
              <div className="flex justify-between items-center">
                {slide.mintPrice && (
                  <span className="text-2xl font-medium text-white">
                    {slide.mintPrice} ETH
                  </span>
                )}
                <div className="w-48">
                  <MintButton slideId={slide.id} showDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;