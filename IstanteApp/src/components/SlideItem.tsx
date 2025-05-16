import React from 'react';
import { Slide } from '../types';
import MintButton from './MintButton';

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, isActive }) => {
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
              <h2 className="text-3xl font-bold mb-3 text-white">{slide.title}</h2>
              <p className="text-gray-200 mb-6 text-lg line-clamp-2">{slide.description}</p>
              
              <div className="flex justify-between items-center">
                {slide.mintPrice && (
                  <span className="text-2xl font-medium text-white">
                    {slide.mintPrice} ETH
                  </span>
                )}
                <MintButton slideId={slide.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;