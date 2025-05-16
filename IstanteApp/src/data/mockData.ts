import { Slide } from '../types';

export const mockSlides: Slide[] = [
  {
    id: '1',
    title: 'Cosmic Dreamscape',
    description: 'A mesmerizing journey through the cosmos, where nebulae and galaxies swirl in a dance of light and color. This NFT captures the essence of cosmic wonder.',
    imageUrl: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mintPrice: '0.25',
    author: {
      id: 'user1',
      name: 'CosmicArtist',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFollowing: false
    }
  },
  {
    id: '2',
    title: 'Digital Eden',
    description: 'An ethereal garden where digital flora blooms in impossible patterns. Each pixel is meticulously crafted to create a sense of peace and harmony.',
    imageUrl: 'https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mintPrice: '0.15',
    author: {
      id: 'user2',
      name: 'DigitalDreamer',
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFollowing: true
    }
  },
  {
    id: '3',
    title: 'Neon Metropolis',
    description: 'A futuristic cityscape bathed in the glow of neon lights. This piece captures the vibrant energy and endless possibilities of tomorrow\'s urban centers.',
    imageUrl: 'https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mintPrice: '0.30',
    author: {
      id: 'user3',
      name: 'NeonArtist',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFollowing: false
    }
  },
  {
    id: '4',
    title: 'Abstract Emotions',
    description: 'A visual representation of human emotion, where color and form combine to evoke feelings of joy, contemplation, and wonder. A truly unique digital experience.',
    imageUrl: 'https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mintPrice: '0.20',
    author: {
      id: 'user4',
      name: 'EmotionalArt',
      avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isFollowing: true
    }
  }
];