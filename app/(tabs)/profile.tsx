import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import VideoGrid from '@/components/VideoGrid';
import { mockUser, mockVideos } from '@/utils/mockData';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const handleEditProfile = () => {
    // In a real app, this would navigate to the edit profile screen
    console.log('Edit profile');
  };
  
  const handleVideoPress = (videoId: string) => {
    // In a real app, this would navigate to the video player
    console.log('View video:', videoId);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#121212', '#2A2A2A']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.headerContainer}>
        <ProfileHeader 
          user={mockUser} 
          onEditProfile={handleEditProfile}
        />
      </View>
      
      <View style={styles.gridContainer}>
        <VideoGrid 
          videos={mockVideos.filter(v => v.userId === mockUser.id)} 
          onVideoPress={handleVideoPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    zIndex: 1, // Ensure header appears above the grid
  },
  gridContainer: {
    flex: 1,
  },
});