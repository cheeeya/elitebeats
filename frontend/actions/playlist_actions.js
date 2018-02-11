export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';

export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});
