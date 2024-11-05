import TrackPlayer from 'react-native-track-player';

export async function playbackService() {
  TrackPlayer.addEventListener('playback-state', async data => {
    // Handle playback state changes here
  });

  TrackPlayer.addEventListener('playback-track-changed', async data => {
    // Handle track changes here
  });
}
