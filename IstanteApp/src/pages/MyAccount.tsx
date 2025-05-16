import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Twitter, MapPin, Edit2, Check, X, Camera, Upload } from 'lucide-react';

interface CollectionItem {
  id: string;
  title: string;
  totalMints: number;
  amountCollected: number;
}

interface Transaction {
  id: string;
  ownerAddress: string;
  date: string;
  amount: number;
  transactionId: string;
}

interface MomentDetails extends CollectionItem {
  transactions: Transaction[];
}

interface UserProfile {
  name: string;
  bio: string;
  location: string;
  twitter: string;
  warpcast: string;
  avatar: string | null;
}

// Mock data for collection with transactions
const mockCollection: MomentDetails[] = [
  {
    id: 'moment-1',
    title: 'Cosmic Dreamscape',
    totalMints: 150,
    amountCollected: 37.5,
    transactions: [
      {
        id: 'tx-1',
        ownerAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        date: '2024-03-20T15:30:00Z',
        amount: 0.25,
        transactionId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      {
        id: 'tx-2',
        ownerAddress: '0x123d35Cc6634C0532925a3b844Bc454e4438f123',
        date: '2024-03-19T10:15:00Z',
        amount: 0.25,
        transactionId: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      }
    ]
  },
  {
    id: 'moment-2',
    title: 'Digital Eden',
    totalMints: 85,
    amountCollected: 12.75,
    transactions: [
      {
        id: 'tx-3',
        ownerAddress: '0x987d35Cc6634C0532925a3b844Bc454e4438f987',
        date: '2024-03-18T09:45:00Z',
        amount: 0.15,
        transactionId: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      }
    ]
  },
  {
    id: 'moment-3',
    title: 'Neon Metropolis',
    totalMints: 200,
    amountCollected: 60,
    transactions: [
      {
        id: 'tx-4',
        ownerAddress: '0x456d35Cc6634C0532925a3b844Bc454e4438f456',
        date: '2024-03-17T14:20:00Z',
        amount: 0.3,
        transactionId: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210'
      }
    ]
  }
];

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<MomentDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    bio: '',
    location: '',
    twitter: '',
    warpcast: '',
    avatar: null
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const totalEarnings = mockCollection.reduce((sum, item) => sum + item.amountCollected, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTransactionId = (txId: string) => {
    return `${txId.slice(0, 10)}...${txId.slice(-8)}`;
  };

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProfile({ ...editedProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setEditedProfile({ ...editedProfile, avatar: null });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 md:pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors text-sm font-medium"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {isEditing ? (
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {editedProfile.avatar ? (
                        <img
                          src={editedProfile.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="photo-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    <button
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {isEditing && editedProfile.avatar && (
                <button
                  onClick={handleRemovePhoto}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Remove photo
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {profile.name || 'Add your name'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  placeholder="Tell us about yourself"
                  rows={3}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {profile.bio || 'Add your bio'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              {isEditing ? (
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    placeholder="Where are you based?"
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {profile.location || 'Add your location'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Social Accounts
              </label>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={editedProfile.twitter}
                        onChange={(e) => setEditedProfile({ ...editedProfile, twitter: e.target.value })}
                        placeholder="Twitter username"
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      value={editedProfile.warpcast}
                      onChange={(e) => setEditedProfile({ ...editedProfile, warpcast: e.target.value })}
                      placeholder="Warpcast username"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </>
                ) : (
                  <div className="space-y-2">
                    {profile.twitter && (
                      <a
                        href={`https://twitter.com/${profile.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        @{profile.twitter}
                      </a>
                    )}
                    {profile.warpcast && (
                      <a
                        href={`https://warpcast.com/${profile.warpcast}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <span className="font-bold">fc/</span>
                        {profile.warpcast}
                      </a>
                    )}
                    {!profile.twitter && !profile.warpcast && (
                      <p className="text-gray-500 dark:text-gray-400">
                        Add your social accounts
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Collection Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {selectedMoment ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedMoment.title} Transactions
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Owner</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {selectedMoment.transactions.map((tx) => (
                      <tr key={tx.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                            {formatAddress(tx.ownerAddress)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(tx.date)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                            {formatTransactionId(tx.transactionId)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {tx.amount} ETH
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={`https://base.blockscout.com/tx/${tx.transactionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors text-sm font-medium"
                          >
                            View
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Collection</h2>
                <div className="bg-purple-50 dark:bg-purple-500/10 px-4 py-2 rounded-lg">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Total Earnings: {totalEarnings} ETH
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Moment ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total Mints</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount (ETH)</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {mockCollection.map((item) => (
                      <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{item.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.totalMints}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.amountCollected}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedMoment(item)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all"
                          >
                            See details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;