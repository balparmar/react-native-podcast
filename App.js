import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

import EpisodeList from './components/EpisodeList';
import MediaControls from './components/MediaControls';
import episodeData from './episodes.json';
import TrackPlayer from 'react-native-track-player';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  });
  await addTracks();
  return true;
};

const addTracks = async () => {
  for (let episode of episodeData.items) {
    await TrackPlayer.add({
      id: episode.id,
      url: episode.mp3,
      type: 'default',
      title: episode.title,
      album: episode.publisher,
      artwork: episode.artwork,
    });
  }
};

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(episodeData.items[0]);

  useEffect(() => {
    const startPlayer = async () => {
      await trackPlayerInit();
    };
    startPlayer();
    TrackPlayer.addEventListener('playback-track-changed', async () => {
      const newCurrentTrackId = await TrackPlayer.getCurrentTrack();
      const newCurrentTrack = await TrackPlayer.getTrack(newCurrentTrackId);
      setCurrentTrack(newCurrentTrack);
    });
  }, []);

  return (
    <View>
      <EpisodeList episodes={episodeData.items} />
      <Text>Current Episode: {currentTrack.title}</Text>
      <Image style={styles.artwork} source={{uri: currentTrack.artwork}} />
      <MediaControls />
    </View>
  );
};

const styles = StyleSheet.create({
  artwork: {
    height: 100,
    width: 100,
  },
});

export default App;
