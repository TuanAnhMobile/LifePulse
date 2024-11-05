import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';

const Music2 = () => {
  const route = useRoute();
  const {title, artist, img, url} = route.params;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackState, setPlaybackState] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({title, artist});
  const [currentPosition, setCurrentPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  const setupApp = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: '1',
      url,
      title,
      artist,
    });
    const duration = await TrackPlayer.getDuration();
    setTrackDuration(duration);
  };

  useEffect(() => {
    setupApp();

    const playbackStateListener = TrackPlayer.addEventListener(
      'playback-state',
      async ({state}) => {
        setPlaybackState(state);
      },
    );

    const playbackTrackChangedListener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({nextTrack}) => {
        const trackInfo = await TrackPlayer.getTrack(nextTrack);
        setCurrentTrack({
          title: trackInfo.title,
          artist: trackInfo.artist,
        });
      },
    );

    const playbackProgressListener = TrackPlayer.addEventListener(
      'playback-progress',
      async ({position}) => {
        setCurrentPosition(position);
        const duration = await TrackPlayer.getDuration();
        setTrackDuration(duration);
      },
    );

    const interval = setInterval(async () => {
      const position = await TrackPlayer.getPosition();
      setCurrentPosition(position);
    }, 1000);

    return () => {
      playbackStateListener.remove();
      playbackTrackChangedListener.remove();
      playbackProgressListener.remove();
      clearInterval(interval);
    };
  }, []);

  const PlayMusic = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const PauseMusic = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  const SeekTo = async position => {
    await TrackPlayer.seekTo(position);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <View style={{backgroundColor: '#242B34', flex: 1}}>
      <View style={{marginTop: 30}}>
        <Image source={{uri: img}} style={styles.img} />
      </View>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
          }}>
          {currentTrack.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            color: 'white',
            marginTop: 5,
          }}>
          {currentTrack.artist}
        </Text>
      </View>
      <View>
        <Slider
          style={styles.slider}
          value={currentPosition}
          minimumValue={0}
          maximumValue={trackDuration}
          onValueChange={value => SeekTo(value)}
          minimumTrackTintColor="#1FB28F"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1EB1E6"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
          <Text style={styles.timeText}>{formatTime(trackDuration)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          width: '60%',
          marginTop: 30,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../icon/ic_03.png')}
            style={{objectFit: 'contain', width: 50, height: 50}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={isPlaying ? PauseMusic : PlayMusic}>
          <Image
            source={
              isPlaying
                ? require('../../icon/ic_pause.png')
                : require('../../icon/ic_01.png')
            }
            style={{objectFit: 'contain', width: 60, height: 60}}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../icon/ic_02.png')}
            style={{objectFit: 'contain', width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Music2;

const styles = StyleSheet.create({
  img: {
    objectFit: 'contain',
    width: 350,
    height: 350,
    borderRadius: 30,
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    shadowColor: '#8A2BE2',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  slider: {
    width: 400,
    height: 40,
    margin: 10,
    alignSelf: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 5,
  },
  timeText: {
    color: 'white',
  },
});
