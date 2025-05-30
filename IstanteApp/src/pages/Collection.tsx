import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockSlides } from '../data/mockData';
import { Slide } from '../types';

const Collection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMoments, setFilteredMoments] = useState<Slide[]>(mockSlides.slice(0, 2)); // Simulating owned moments
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = mockSlides.slice(0, 2).filter(moment => 
      moment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moment.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMoments(filtered);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 md:pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Collection</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your moments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMoments.map((moment) => (
          <div
            key={moment.id}
            onClick={() => navigate(`/moment/${moment.id}`)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
              <h3 className="text-lg font-semibold mb-2">{moment.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {moment.description}
              </p>
              <div className="flex justify-end">
                <button className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;