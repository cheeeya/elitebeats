export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const RECEIVE_SONG_PROFILE = 'RECEIVE_SONG_PROFILE';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';
export const RECEIVE_SONG_PROFILE_ERRORS = 'RECEIVE_SONG_PROFILE_ERRORS';
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

const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
});

const receiveSongProfile = song => ({
  type: RECEIVE_SONG_PROFILE,
  song
});

const receiveSongProfileErrors = errors => ({
  type: RECEIVE_SONG_PROFILE_ERRORS,
  errors
});


export const fetchAllSongs = () => dispatch => (
  SongAPIUtil.fetchAllSongs().then(
    allSongs => dispatch(receiveAllSongs(allSongs)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
);

export const createSong = formData => dispatch => (
  SongAPIUtil.createSong(formData).then(
    song => dispatch(receiveSong(song))).fail(
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
);

export const updateSong = (formData, songId) => dispatch => (
  SongAPIUtil.updateSong(formData, songId).then(
    song=> dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
);

export const deleteSong = songId => dispatch => (
  SongAPIUtil.deleteSong(songId).then(
    song => dispatch(removeSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
);

export const fetchSong = (profile_url, permalink) => dispatch => (
  SongAPIUtil.fetchSong(profile_url, permalink).then(
    song => dispatch(receiveSongProfile(song)),
    errors => dispatch(receiveSongProfileErrors(errors.responseJSON))
  )
);

export const incrementSongPlays = song => dispatch => (
  SongAPIUtil.incrementSongPlays(song).then(
    song => dispatch(receiveSong(song)),
    errors => dispatch(receiveSongErrors(errors.responseJSON))
  )
);
