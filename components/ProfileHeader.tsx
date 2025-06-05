import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserData } from '@/types';
import { Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileHeaderProps {
  user: UserData;
  onEditProfile: () => void;
}

export default function ProfileHeader({ user, onEditProfile }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.gradient}
      />
      
      <View style={styles.headerTop}>
        <Text style={styles.username}>@{user.username}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileContent}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.videosCount}</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.bio} numberOfLines={2}>
        {user.bio}
      </Text>
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={onEditProfile}
        activeOpacity={0.8}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  username: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FF4365',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#AAAAAA',
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#DDDDDD',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});