import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';

const MediaControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  const onPlayPress = () => {
    if (!isPlaying) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };

  const onNextPress = () => {
    TrackPlayer.skipToNext().catch(() => {
      console.log("There's no next podcast queued up!");
    });
  };

  const onPrevPress = () => {
    TrackPlayer.skipToPrevious().catch(() => {
      console.log("There's no previous podcast in the queue!");
    });
  };

  return (
    <View style={styles.groupedMediaButtons}>
      <TouchableOpacity onPress={onPrevPress}>
        <Image
          style={styles.mediaButton}
          source={require('../images/previous-button.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPress}>
        <Image
          style={styles.mediaButton}
          source={
            isPlaying
              ? require('../images/pause-button.png')
              : require('../images/play-button.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNextPress}>
        <Image
          style={styles.nextButton}
          source={require('../images/previous-button.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaButton: {
    width: 50,
    height: 50,
  },
  nextButton: {
    width: 50,
    height: 50,
    transform: [{rotate: '180deg'}],
  },
  groupedMediaButtons: {
    flexDirection: 'row',
  },
});

export default MediaControls;
