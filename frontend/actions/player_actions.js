export const NEXT_SONG = 'NEXT_SONG';
export const PLAY_SONG = 'PLAY_SONG';
export const PREV_SONG = 'PREV_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const RECEIVE_CURRENT_PLAYLIST = 'RECEIVE_CURRENT_PLAYLIST';
import * as PlayerUtil from '../util/player_util';

export const playSong = song => ({
  type: PLAY_SONG,
  song
});

const nextSong = song => ({
  type: NEXT_SONG,
  song
});

const prevSong = song => ({
  type: PREV_SONG,
  song
});

export const pauseSong = () => ({
  type: PAUSE_SONG
});

export const receiveCurrentPlaylist = playlist => ({
  type: RECEIVE_CURRENT_PLAYLIST,
  playlist
});

export const getNextSong = (currentPlaylist, nextSongIndex) => dispatch => (
  dispatch(playSong(PlayerUtil.getSongFromPlaylist(currentPlaylist, nextSongIndex)))
);
