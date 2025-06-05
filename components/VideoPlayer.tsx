import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Pressable } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Play, Pause } from 'lucide-react-native';
import { VideoData } from '@/types';

interface VideoPlayerProps {
  video: VideoData;
  isActive: boolean;
  onError?: (error: string) => void;
}

export default function VideoPlayer({ video, isActive, onError }: VideoPlayerProps) {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<Video>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Only use native video control methods on non-web platforms
    if (Platform.OS !== 'web' && videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isActive, isPlaying]);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const startControlsTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoPress = () => {
    setShowControls(true);
    startControlsTimer();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    startControlsTimer();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    
    if (status.isLoaded) {
      setIsLoading(false);
    }
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const handleVideoError = (error: string) => {
    setIsLoading(false);
    if (onError) {
      onError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.videoContainer} onPress={handleVideoPress}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: video.uri }}
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          onLoadStart={onLoadStart}
          onError={() => handleVideoError('Failed to load video')}
          useNativeControls={Platform.OS === 'web'}
          shouldPlay={Platform.OS === 'web' ? (isActive && isPlaying) : undefined}
        />
        
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
        
        {!isLoading && Platform.OS !== 'web' && showControls && (
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
            activeOpacity={0.7}
          >
            {isPlaying ? (
              <Pause color="#FFFFFF\" size={32} />
            ) : (
              <Play color="#FFFFFF" size={32} />
            )}
          </TouchableOpacity>
        )}
      </Pressable>
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
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});