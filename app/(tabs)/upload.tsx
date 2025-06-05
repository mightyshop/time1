import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Platform, 
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function UploadScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  
  const pickVideo = async () => {
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
      // In a real app, we would generate a thumbnail from the video
      // For this example, we'll just use a placeholder
      setThumbnail('https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg');
    }
  };
  
  const recordVideo = async () => {
    // In a real app, this would launch the camera to record video
    // For this example, we'll just use the image picker
    await pickVideo();
  };
  
  const uploadVideo = () => {
    // In a real app, this would upload the video to a server
    alert('Video would be uploaded in a real app!');
    setVideoUri(null);
    setThumbnail(null);
    setCaption('');
  };
  
  const Container = Platform.OS !== 'web' ? BlurView : View;
  const containerProps = Platform.OS !== 'web' 
    ? { intensity: 20, tint: 'dark' } 
    : {};
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#121212', '#2A2A2A']}
        style={StyleSheet.absoluteFill}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload a Video</Text>
        
        {videoUri ? (
          <View style={styles.previewContainer}>
            {thumbnail && (
              <Image source={{ uri: thumbnail }} style={styles.videoPreview} />
            )}
            <Text style={styles.fileName}>
              Video selected: {videoUri.split('/').pop()}
            </Text>
            
            <TextInput
              style={styles.captionInput}
              placeholder="Add a caption..."
              placeholderTextColor="#999999"
              value={caption}
              onChangeText={setCaption}
              multiline
            />
            
            <Container style={styles.actionButtonsContainer} {...containerProps}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => {
                  setVideoUri(null);
                  setThumbnail(null);
                  setCaption('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.uploadButton]}
                onPress={uploadVideo}
              >
                <Text style={styles.uploadButtonText}>Upload</Text>
              </TouchableOpacity>
            </Container>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={recordVideo}
            >
              <View style={styles.iconContainer}>
                <Camera color="#FFFFFF" size={32} />
              </View>
              <Text style={styles.optionText}>Record Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={pickVideo}
            >
              <View style={styles.iconContainer}>
                <ImageIcon color="#FFFFFF" size={32} />
              </View>
              <Text style={styles.optionText}>Choose from Library</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  optionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 67, 101, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  videoPreview: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  fileName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 16,
  },
  captionInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.05)' : undefined,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#AAAAAA',
  },
  uploadButton: {
    backgroundColor: '#FF4365',
    borderRadius: 8,
  },
  uploadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});