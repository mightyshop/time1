import { VideoData, UserData } from '@/types';

export const mockUser: UserData = {
  id: 'user123',
  username: 'videoCreator',
  avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
  bio: 'Creating awesome videos 📱 | Follow for more content! | DM for collabs',
  videosCount: 24,
  followersCount: 12400,
  followingCount: 357,
};

export const mockVideos: VideoData[] = [
  {
    id: 'video1',
    userId: 'user123',
    username: 'videoCreator',
    title: '🌊 Capturing the mesmerizing waves at sunset on Venice Beach!...',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    thumbnail: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
    views: 12500,
    likes: 2400,
    comments: 184,
    shares: 57
  },
  {
    id: 'video2',
    userId: 'user123',
    username: 'videoCreator',
    title: '🌸 Spring has finally arrived in the city!...',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    thumbnail: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    views: 8900,
    likes: 1200,
    comments: 95,
    shares: 32
  },
  {
    id: 'video3',
    userId: 'user123',
    username: 'videoCreator',
    title: '✨ Late night vibes in the city that never sleeps!...',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    thumbnail: 'https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg',
    views: 15700,
    likes: 3200,
    comments: 276,
    shares: 89
  },
  {
    id: 'video4',
    userId: 'user456',
    username: 'traveler',
    title: '🏛️ Exploring the ancient ruins of Machu Picchu...',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    thumbnail: 'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg',
    views: 7300,
    likes: 856,
    comments: 42,
    shares: 12
  },
  {
    id: 'video5',
    userId: 'user789',
    username: 'foodie',
    title: '🍝 Mastering the art of homemade pasta!...',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4',
    thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    views: 9400,
    likes: 1450,
    comments: 68,
    shares: 23
  }
];