import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Text, 
  Dimensions 
} from 'react-native';
import { VideoData } from '@/types';
import { Play } from 'lucide-react-native';

interface VideoGridProps {
  videos: VideoData[];
  onVideoPress: (videoId: string) => void;
}

export default function VideoGrid({ videos, onVideoPress }: VideoGridProps) {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 32 - 8) / 2; // 16px padding on each side, 8px gap
  
  const renderItem = ({ item }: { item: VideoData }) => {
    return (
      <TouchableOpacity 
        style={[styles.videoItem, { width: itemWidth }]}
        onPress={() => onVideoPress(item.id)}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.thumbnail} 
        />
        <View style={styles.videoOverlay}>
          <Play color="#FFFFFF" size={24} style={styles.playIcon} />
          <Text style={styles.viewCount}>{item.views} views</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra padding for tab bar
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  videoItem: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 8,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 8,
    borderRadius: 8,
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  viewCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
});