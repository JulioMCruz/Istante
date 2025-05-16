import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Plus, X, Globe, Lock } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

interface CreateMomentProps {
  onCreateMoment: (data: { title: string; description: string; imageUrl: string }) => void;
}

const CreateMoment: React.FC<CreateMomentProps> = ({ onCreateMoment }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [treasuryWallet, setTreasuryWallet] = useState('');
  const [signers, setSigners] = useState<string[]>(['']);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [mintPrice, setMintPrice] = useState('');
  const [mintCurrency, setMintCurrency] = useState<'ETH' | 'USDC' | 'EURC'>('ETH');
  const [maxMints, setMaxMints] = useState('');
  const navigate = useNavigate();
  
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSigner = () => {
    setSigners([...signers, '']);
  };

  const handleRemoveSigner = (index: number) => {
    if (signers.length > 1) {
      const newSigners = signers.filter((_, i) => i !== index);
      setSigners(newSigners);
    }
  };

  const handleSignerChange = (index: number, value: string) => {
    const newSigners = [...signers];
    newSigners[index] = value;
    setSigners(newSigners);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !imagePreview || !treasuryWallet) {
      alert('Please fill all required fields and upload an image');
      return;
    }

    if (!treasuryWallet.match(/^0x[a-fA-F0-9]{40}$/)) {
      alert('Please enter a valid Ethereum wallet address');
      return;
    }

    if (!isPublic && !inviteCode) {
      alert('Please enter an invite code for private moments');
      return;
    }

    if (mintPrice && isNaN(Number(mintPrice))) {
      alert('Please enter a valid price');
      return;
    }

    if (maxMints && isNaN(Number(maxMints))) {
      alert('Please enter a valid number for maximum mints');
      return;
    }

    const invalidSigners = signers.some(signer => !signer.match(/^0x[a-fA-F0-9]{40}$/));
    if (invalidSigners) {
      alert('Please enter valid Ethereum wallet addresses for all signers');
      return;
    }
    
    onCreateMoment({
      title,
      description,
      imageUrl: imagePreview
    });
    
    setShowSuccessModal(true);
  };

  const handleSaveDraft = () => {
    const draft = {
      title,
      description,
      imagePreview,
      treasuryWallet,
      signers,
      isPublic,
      inviteCode,
      mintPrice,
      mintCurrency,
      maxMints
    };
    localStorage.setItem('momentDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setTitle('');
    setDescription('');
    setImagePreview(null);
    setTreasuryWallet('');
    setSigners(['']);
    setIsPublic(true);
    setInviteCode('');
    setMintPrice('');
    setMintCurrency('ETH');
    setMaxMints('');
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

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Moment</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="moment-title">
                Title
              </label>
              <input
                id="moment-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My awesome moment"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="moment-description">
                Description
              </label>
              <textarea
                id="moment-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about this moment..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Visibility
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors ${
                    isPublic
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <Globe className={`w-5 h-5 ${isPublic ? 'text-purple-500' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${isPublic ? 'text-purple-700' : 'text-gray-700'}`}>Public</p>
                    <p className="text-sm text-gray-500">Anyone can view</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors ${
                    !isPublic
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <Lock className={`w-5 h-5 ${!isPublic ? 'text-purple-500' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${!isPublic ? 'text-purple-700' : 'text-gray-700'}`}>Invite Only</p>
                    <p className="text-sm text-gray-500">Requires invite code</p>
                  </div>
                </button>
              </div>

              {!isPublic && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="invite-code">
                    Invite Code
                  </label>
                  <input
                    id="invite-code"
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter invite code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required={!isPublic}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="treasury-wallet">
                Treasury Wallet
              </label>
              <input
                id="treasury-wallet"
                type="text"
                value={treasuryWallet}
                onChange={(e) => setTreasuryWallet(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                pattern="^0x[a-fA-F0-9]{40}$"
                title="Please enter a valid Ethereum wallet address"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the Ethereum wallet address where you want to receive the funds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mint Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mintPrice}
                    onChange={(e) => setMintPrice(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <select
                    value={mintCurrency}
                    onChange={(e) => setMintCurrency(e.target.value as 'ETH' | 'USDC' | 'EURC')}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="EURC">EURC</option>
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500">Leave empty for free minting</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Mints
                </label>
                <input
                  type="text"
                  value={maxMints}
                  onChange={(e) => setMaxMints(e.target.value)}
                  placeholder="Unlimited"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="mt-1 text-sm text-gray-500">Leave empty for unlimited mints</p>
              </div>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-1">Moment Image</p>
              
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg hover:bg-black/80 transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4 text-center">
                      Drag and drop an image or click to browse
                    </p>
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      Select Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Moment Signers
                </label>
                <button
                  type="button"
                  onClick={handleAddSigner}
                  className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Signer
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Add wallet addresses of people who need to sign this moment
              </p>
              
              <div className="space-y-3">
                {signers.map((signer, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={signer}
                      onChange={(e) => handleSignerChange(index, e.target.value)}
                      placeholder="0x..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                      pattern="^0x[a-fA-F0-9]{40}$"
                      title="Please enter a valid Ethereum wallet address"
                      required
                    />
                    {signers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSigner(index)}
                        className="px-3 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
              >
                Create Moment
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default CreateMoment;