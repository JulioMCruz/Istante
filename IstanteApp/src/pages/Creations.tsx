import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Calendar, Eye, Upload, Edit } from 'lucide-react';

interface CollectionItem {
  id: string;
  title: string;
  totalMints: number;
  amountCollected: number;
  publishedAt: string;
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

type TimeFilter = 'this-month' | 'last-6-months' | 'last-year' | 'all';
type MomentStatus = 'Created' | 'Draft' | 'Signing' | 'Signed';

interface CreatedMoment {
  id: string;
  title: string;
  createdAt: string;
  status: MomentStatus;
}

// Mock data for created moments
const mockCreatedMoments: CreatedMoment[] = [
  {
    id: 'new-1',
    title: 'Mountain Sunrise',
    createdAt: '2024-03-21T08:30:00Z',
    status: 'Created'
  },
  {
    id: 'new-2',
    title: 'Urban Night',
    createdAt: '2024-03-20T15:45:00Z',
    status: 'Draft'
  },
  {
    id: 'new-3',
    title: 'Ocean Waves',
    createdAt: '2024-03-19T12:20:00Z',
    status: 'Signing'
  },
  {
    id: 'new-4',
    title: 'Desert Storm',
    createdAt: '2024-03-18T09:15:00Z',
    status: 'Signed'
  }
];

// Mock data for collection with transactions
const mockCollection: MomentDetails[] = [
  {
    id: 'moment-1',
    title: 'Cosmic Dreamscape',
    totalMints: 150,
    amountCollected: 37.5,
    publishedAt: '2024-03-20T15:30:00Z',
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
    publishedAt: '2024-02-15T09:45:00Z',
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
    publishedAt: '2023-09-17T14:20:00Z',
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

const Creations: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<MomentDetails | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

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

  const filterMoments = (moments: MomentDetails[]): MomentDetails[] => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

    return moments.filter(moment => {
      const publishedDate = new Date(moment.publishedAt);
      switch (timeFilter) {
        case 'this-month':
          return publishedDate >= firstDayOfMonth;
        case 'last-6-months':
          return publishedDate >= sixMonthsAgo;
        case 'last-year':
          return publishedDate >= oneYearAgo;
        default:
          return true;
      }
    });
  };

  const getStatusColor = (status: MomentStatus) => {
    switch (status) {
      case 'Created':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
      case 'Signing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300';
      case 'Signed':
        return 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
    }
  };

  const getActionButton = (moment: CreatedMoment) => {
    switch (moment.status) {
      case 'Created':
      case 'Draft':
        return (
          <button
            onClick={() => navigate(`/moment/${moment.id}/edit`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        );
      case 'Signing':
        return (
          <button
            onClick={() => navigate(`/moment/${moment.id}/view`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
        );
      case 'Signed':
        return (
          <button
            onClick={() => navigate(`/publish/${moment.id}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-500/30 transition-colors text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            Publish
          </button>
        );
    }
  };

  const filteredMoments = filterMoments(mockCollection);

  return (
    <div className="container mx-auto px-4 pt-24 pb-24 md:pb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Creations</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Created Moments Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Created Moments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Created</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockCreatedMoments.map((moment) => (
                  <tr key={moment.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{moment.title}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(moment.createdAt)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(moment.status)}`}>
                        {moment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {getActionButton(moment)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Published Moments Section */}
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
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Published Moments</h2>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                      className="text-sm text-gray-600 dark:text-gray-300 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <option value="all">All Time</option>
                      <option value="this-month">This Month</option>
                      <option value="last-6-months">Last 6 Months</option>
                      <option value="last-year">Last Year</option>
                    </select>
                  </div>
                </div>
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Published</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total Mints</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount (ETH)</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredMoments.map((item) => (
                      <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{item.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(item.publishedAt)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.totalMints}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.amountCollected}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedMoment(item)}
                            className="px-3 py-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
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

export default Creations;