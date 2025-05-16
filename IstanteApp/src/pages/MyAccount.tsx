import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SignRequest {
  id: string;
  momentTitle: string;
  creatorAddress: string;
  creatorEns?: string;
  timestamp: number;
  status: 'pending' | 'signed';
  createdAt: string;
}

// Mock data for sign requests
const mockSignRequests: SignRequest[] = [
  {
    id: '1',
    momentTitle: 'Cosmic Dreamscape',
    creatorAddress: '0x1234...5678',
    creatorEns: 'cosmic.eth',
    timestamp: Date.now() - 3600000,
    status: 'pending',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    momentTitle: 'Digital Eden',
    creatorAddress: '0x8765...4321',
    timestamp: Date.now() - 7200000,
    status: 'signed',
    createdAt: '2024-03-14T15:45:00Z'
  }
];

const MyAccount: React.FC = () => {
  const navigate = useNavigate();

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 md:pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="max-w-3xl mx-auto">
        {/* Connected Wallet Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Wallet</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium">W</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">0xD8...F3a2</p>
                <p className="text-sm text-gray-500">Connected with MetaMask</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
              Disconnect
            </button>
          </div>
        </div>

        {/* Sign Requests Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign Requests</h2>
          
          {mockSignRequests.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {mockSignRequests.map((request) => (
                <div key={request.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {request.momentTitle}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {request.status === 'pending' ? 'Pending to Sign' : 'Signed'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        From: {request.creatorEns || request.creatorAddress}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-gray-400">
                          Created: {formatDate(request.createdAt)}
                        </p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-400">
                          {formatTimeAgo(request.timestamp)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/moment/${request.id}`)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No sign requests at the moment
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;