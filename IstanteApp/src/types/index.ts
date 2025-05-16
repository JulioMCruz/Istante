export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  mintPrice?: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
}