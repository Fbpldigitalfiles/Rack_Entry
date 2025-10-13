import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
const VideoPlayerscreen = ({ videoSource }) => {
//   const videoPlayer = useRef(null);

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{ uri: videoSource }}
        style={styles.video}
        paused={false} // Set paused to true or false to control playback
        resizeMode="contain"
        // Any other props or configurations specific to 'react-native-video-controls'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    // zIndex: 1,
  },
});

export default VideoPlayerscreen;
