export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const RECEIVE_SONG = 'RECEIVE_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
import * as SongAPIUtil from '../util/song_api_util.js';
import { Redirect } from 'react-router-dom';

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
    (song) => dispatch(removeSong(song))
  )
)
