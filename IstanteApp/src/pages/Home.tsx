import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import { Slide } from '../types';

interface HomeProps {
  slides: Slide[];
}

type FilterCategory = 'all' | 'for-you' | 'recommended' | 'explore';

const Home: React.FC<HomeProps> = ({ slides }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const navigate = useNavigate();

  const handleFilterChange = (filter: FilterCategory) => {
    if (filter === 'explore') {
      navigate('/explore');
      return;
    }
    setActiveFilter(filter);
  };

  const filters: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'for-you', label: 'For You' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'explore', label: 'Explore' },
  ];

  // In a real app, you would filter the slides based on the active filter
  const filteredSlides = slides;

  return (
    <main className="pt-16 relative">
      {/* Filter Bar */}
      <div className="absolute top-20 left-0 right-0 z-20 flex justify-center gap-2 px-4">
        <div className="inline-flex gap-2 p-1 bg-black/20 backdrop-blur-sm rounded-full">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <ImageSlider slides={filteredSlides} />
    </main>
  );
};

export default Home;