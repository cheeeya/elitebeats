export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const RECEIVE_SONG_PROFILE = 'RECEIVE_SONG_PROFILE';
import * as SongAPIUtil from '../util/song_api_util';

const receiveAllSongs = allSongs => ({
  type: RECEIVE_ALL_SONGS,
  allSongs
});

const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
});

const removeSong = song => ({
  type: REMOVE_SONG,
  song
});

const receiveSongProfile = song => ({
  type: RECEIVE_SONG_PROFILE,
  song
});

export const fetchAllSongs = () => dispatch => (
  SongAPIUtil.fetchAllSongs().then(allSongs => dispatch(receiveAllSongs(allSongs)))
);

export const createSong = formData => dispatch => (
  SongAPIUtil.createSong(formData).then(
    song => dispatch(receiveSong(song))
  )
);

export const updateSong = (formData, songId) => dispatch => (
  SongAPIUtil.updateSong(formData, songId).then(
    song=> dispatch(receiveSong(song))
  )
);

export const deleteSong = songId => dispatch => (
  SongAPIUtil.deleteSong(songId).then(
    song => dispatch(removeSong(song))
  )
);

export const fetchSong = (profile_url, permalink) => dispatch => (
  SongAPIUtil.fetchSong(profile_url, permalink).then(
    song => dispatch(receiveSongProfile(song))
  )
);
