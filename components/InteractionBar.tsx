import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  Modal,
  Pressable,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import { Heart, MessageCircle, Share2, Plus, ChevronDown, X, ThumbsDown } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { VideoData } from '@/types';
import * as Haptics from 'expo-haptics';

interface InteractionBarProps {
  video: VideoData;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onFollow: (userId: string) => void;
}

export default function InteractionBar({ 
  video, 
  onLike, 
  onDislike,
  onComment, 
  onShare, 
  onFollow
}: InteractionBarProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  
  const heartScale = useSharedValue(1);
  const thumbsDownScale = useSharedValue(1);
  const commentScale = useSharedValue(1);
  const shareScale = useSharedValue(1);
  const followScale = useSharedValue(1);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
    onLike(video.id);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    heartScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
    onDislike(video.id);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    thumbsDownScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
  };

  const handleComment = () => {
    onComment(video.id);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    commentScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
  };

  const handleShare = () => {
    onShare(video.id);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    shareScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
  };

  const handleFollow = () => {
    setFollowed(!followed);
    onFollow(video.userId);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    followScale.value = withSequence(
      withSpring(1.3),
      withSpring(1)
    );
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const thumbsDownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thumbsDownScale.value }],
  }));

  const commentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: commentScale.value }],
  }));

  const shareAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const followAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: followScale.value }],
  }));

  const truncatedUsername = video.username.length > 15 
    ? `${video.username.slice(0, 15)}...` 
    : video.username;

  const shouldTruncateCaption = video.title.length > 30;
  const displayCaption = shouldTruncateCaption
    ? `${video.title.slice(0, 30)}...`
    : video.title;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.barContent}>
          <View style={styles.contentWrapper}>
            <View style={styles.mainContent}>
              <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg' }} 
                    style={styles.profileImage} 
                  />
                  <Text style={styles.userName}>@{truncatedUsername}</Text>
                </View>
                <TouchableOpacity 
                  onPress={handleFollow} 
                  style={[
                    styles.followButton,
                    followed && styles.followedButton
                  ]}
                >
                  <Animated.View style={followAnimatedStyle}>
                    <Plus color="#FFFFFF" size={16} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
              
              <View style={styles.captionContainer}>
                <Text style={styles.videoTitle} numberOfLines={1}>
                  {displayCaption}
                </Text>
                {shouldTruncateCaption && (
                  <TouchableOpacity 
                    onPress={() => setShowCaptionModal(true)}
                    style={styles.moreButton}
                  >
                    <ChevronDown color="#FFFFFF" size={16} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
                <Animated.View style={[styles.actionButton, heartAnimatedStyle]}>
                  <Heart 
                    color={liked ? '#FF4365' : '#FFFFFF'} 
                    fill={liked ? '#FF4365' : 'transparent'} 
                    size={28} 
                    strokeWidth={2.5}
                  />
                  <Text style={styles.actionText}>{video.likes}</Text>
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDislike} activeOpacity={0.7}>
                <Animated.View style={[styles.actionButton, thumbsDownAnimatedStyle]}>
                  <ThumbsDown 
                    color={disliked ? '#FF4365' : '#FFFFFF'} 
                    fill={disliked ? '#FF4365' : 'transparent'} 
                    size={28}
                    strokeWidth={2.5}
                  />
                </Animated.View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleComment} activeOpacity={0.7}>
                <Animated.View style={[styles.actionButton, commentAnimatedStyle]}>
                  <MessageCircle color="#FFFFFF" size={28} strokeWidth={2.5} />
                  <Text style={styles.actionText}>{video.comments}</Text>
                </Animated.View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
                <Animated.View style={[styles.actionButton, shareAnimatedStyle]}>
                  <Share2 color="#FFFFFF" size={28} strokeWidth={2.5} />
                  <Text style={styles.actionText}>{video.shares}</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={showCaptionModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCaptionModal(false)}
        statusBarTranslucent
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowCaptionModal(false)}
        >
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Caption</Text>
                <TouchableOpacity 
                  onPress={() => setShowCaptionModal(false)}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X color="#FFFFFF" size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView 
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalCaption}>{video.title}</Text>
              </ScrollView>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 65,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  barContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
    marginRight: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  followButton: {
    backgroundColor: '#FF4365',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  followedButton: {
    backgroundColor: '#666666',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  moreButton: {
    marginLeft: 8,
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  actionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 12,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  modalCaption: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    paddingBottom: 20,
  },
});