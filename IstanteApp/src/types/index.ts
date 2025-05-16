export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  mintPrice?: string;
  mintCurrency?: 'ETH' | 'USDC' | 'EURC';
  maxMints?: number;
  author: {
    id: string;
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
}