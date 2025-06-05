import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import VideoCarousel from '@/components/VideoCarousel';
import { mockVideos } from '@/utils/mockData';
import { Search } from 'lucide-react-native';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'inspired' | 'following'>('inspired');
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const handleFollow = (userId: string) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSearch = () => {
    console.log('Open search');
  };

  const filteredVideos = activeTab === 'following'
    ? mockVideos.filter(video => followedUsers.has(video.userId))
    : mockVideos;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('following')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'following' && styles.activeTabText
            ]}>Following</Text>
            {activeTab === 'following' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tab} 
            onPress={() => setActiveTab('inspired')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'inspired' && styles.activeTabText
            ]}>Inspired</Text>
            {activeTab === 'inspired' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
          activeOpacity={0.7}
        >
          <Search color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        {filteredVideos.length > 0 ? (
          <VideoCarousel 
            videos={filteredVideos}
            onFollow={handleFollow}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No videos yet</Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'following' 
                ? 'Follow some creators to see their videos here!'
                : 'No videos available at the moment.'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 2,
    backgroundColor: '#FF4365',
    borderRadius: 1,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  carouselContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    maxWidth: 300,
  },
});