import React, { useState, useRef } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  Dimensions, 
  NativeSyntheticEvent, 
  NativeScrollEvent,
  Text 
} from 'react-native';
import VideoPlayer from './VideoPlayer';
import InteractionBar from './InteractionBar';
import { VideoData } from '@/types';

interface VideoCarouselProps {
  videos: VideoData[];
  onFollow: (userId: string) => void;
}

export default function VideoCarousel({ videos, onFollow }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get('window');

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleLike = (id: string) => {
    console.log('Liked video:', id);
  };

  const handleDislike = (id: string) => {
    console.log('Disliked video:', id);
  };

  const handleComment = (id: string) => {
    console.log('Comment on video:', id);
  };

  const handleShare = (id: string) => {
    console.log('Share video:', id);
  };

  const renderItem = ({ item, index }: { item: VideoData; index: number }) => {
    return (
      <View style={[styles.videoContainer, { width }]}>
        <VideoPlayer 
          video={item} 
          isActive={index === activeIndex}
        />
        <InteractionBar 
          video={item} 
          onLike={handleLike}
          onDislike={handleDislike}
          onComment={handleComment}
          onShare={handleShare}
          onFollow={onFollow}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {videos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No videos available</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});