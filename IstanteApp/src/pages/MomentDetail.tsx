import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockSlides } from '../data/mockData';
import MintButton from '../components/MintButton';

const MomentDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moment = mockSlides.find(slide => slide.id === id);
  const isOwned = mockSlides.slice(0, 2).some(slide => slide.id === id); // Simulating owned moments

  if (!moment) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <h2 className="text-2xl font-bold">Moment not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[calc(100vh-4rem)]">
        <img 
          src={moment.imageUrl} 
          alt={moment.title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 md:pb-6 backdrop-blur-md bg-black/30">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-3 text-white">{moment.title}</h2>
              <p className="text-gray-200 mb-6 text-lg">{moment.description}</p>
              
              <div className="flex justify-between items-center">
                {!isOwned && moment.mintPrice && (
                  <span className="text-2xl font-medium text-white">
                    {moment.mintPrice} ETH
                  </span>
                )}
                {isOwned ? (
                  <button
                    onClick={() => window.open(`https://opensea.io/assets/ethereum/${moment.id}`, '_blank')}
                    className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 border border-blue-400/20"
                  >
                    See in OpenSea
                  </button>
                ) : (
                  <MintButton slideId={moment.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentDetail;