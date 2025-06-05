export interface VideoData {
  id: string;
  userId: string;
  username: string;
  title: string;
  uri: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface UserData {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  videosCount: number;
  followersCount: number;
  followingCount: number;
}