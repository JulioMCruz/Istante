import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockSlides } from '../data/mockData';
import { Slide } from '../types';
import MintButton from '../components/MintButton';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMoments, setFilteredMoments] = useState<Slide[]>(mockSlides);
  const navigate = useNavigate();

  // Mock collected moments - In a real app, this would come from your backend
  const collectedMomentIds = ['1', '3']; // Example: User has collected moments 1 and 3

  useEffect(() => {
    const filtered = mockSlides.filter(moment => 
      moment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moment.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMoments(filtered);
  }, [searchQuery]);

  const isCollected = (momentId: string) => collectedMomentIds.includes(momentId);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Moments</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search moments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMoments.map((moment) => (
          <div
            key={moment.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-video relative">
              <img
                src={moment.imageUrl}
                alt={moment.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{moment.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                {moment.description}
              </p>
              <div className="flex justify-between items-center">
                {!isCollected(moment.id) && (
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    {moment.mintPrice} ETH
                  </span>
                )}
                {isCollected(moment.id) ? (
                  <button
                    onClick={() => navigate(`/moment/${moment.id}`)}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    View Details
                  </button>
                ) : (
                  <MintButton slideId={moment.id} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;