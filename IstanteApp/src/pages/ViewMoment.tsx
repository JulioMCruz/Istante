import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Globe, Lock } from 'lucide-react';

interface SignerStatus {
  address: string;
  status: 'pending' | 'signed';
  signedAt?: string;
}

interface MomentData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  treasuryWallet: string;
  signers: SignerStatus[];
  status: 'Created' | 'Draft' | 'Signing' | 'Signed';
  isPublic: boolean;
  inviteCode?: string;
}

// Mock data - In a real app, this would come from your backend
const mockMoment: MomentData = {
  id: 'new-3',
  title: 'Ocean Waves',
  description: 'A beautiful ocean waves moment',
  imageUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg',
  treasuryWallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  signers: [
    {
      address: '0x123d35Cc6634C0532925a3b844Bc454e4438f123',
      status: 'signed',
      signedAt: '2024-03-21T14:30:00Z'
    },
    {
      address: '0x456d35Cc6634C0532925a3b844Bc454e4438f456',
      status: 'pending'
    },
    {
      address: '0x789d35Cc6634C0532925a3b844Bc454e4438f789',
      status: 'pending'
    }
  ],
  status: 'Signing',
  isPublic: false,
  inviteCode: 'OCEAN2024'
};

const ViewMoment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moment, setMoment] = useState<MomentData | null>(null);
  
  useEffect(() => {
    // In a real app, fetch the moment data from your backend
    setMoment(mockMoment);
  }, [id]);

  if (!moment) {
    return null;
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
    <div className="min-h-screen pt-16 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">View Moment</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                {moment.title}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 min-h-[100px]">
                {moment.description}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Visibility
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                {moment.isPublic ? (
                  <>
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Public</p>
                      <p className="text-sm text-gray-500">Anyone can view this moment</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Invite Only</p>
                      <p className="text-sm text-gray-500">Invite Code: {moment.inviteCode}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Treasury Wallet
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-mono">
                {moment.treasuryWallet}
              </div>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Moment Image</p>
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                <img 
                  src={moment.imageUrl} 
                  alt={moment.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Moment Signers
                </label>
                <span className="text-sm text-gray-500">
                  {moment.signers.filter(s => s.status === 'signed').length} of {moment.signers.length} signed
                </span>
              </div>
              
              <div className="space-y-3">
                {moment.signers.map((signer, index) => (
                  <div key={index} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="flex-1 font-mono text-gray-900">
                      {formatAddress(signer.address)}
                    </div>
                    <div className="flex items-center gap-2">
                      {signer.status === 'signed' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-600">
                            Signed {formatDate(signer.signedAt!)}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm text-gray-600">Pending signature</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoment;