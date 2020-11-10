import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const EpisodeList = ({episodes}) => {
  const onEpisodePress = (episodeId) => {
    TrackPlayer.skip(episodeId.toString());
  };

  const renderEpisodeList = episodes.map((episode) => {
    return (
      <Text key={episode.id}>
        {episode.title}{' '}
        <TouchableOpacity onPress={() => onEpisodePress(episode.id)}>
          <Image
            style={styles.playButton}
            source={require('../images/play-button.png')}
          />
        </TouchableOpacity>
        {'\n'}
      </Text>
    );
  });

  return <View>{renderEpisodeList}</View>;
};

const styles = StyleSheet.create({
  playButton: {
    width: 30,
    height: 30,
  },
});

export default EpisodeList;
