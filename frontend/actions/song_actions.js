export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const RECEIVE_SONG = 'RECEIVE_SONG';
import * as SongAPIUtil from '../util/song_api_util.js';
import { Redirect } from 'react-router-dom';

const receiveAllSongs = songs => ({
  type: RECEIVE_ALL_SONGS,
  songs
})

const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})


export const fetchAllSongs = () => dispatch => (
  SongAPIUtil.fetchAllSongs().then(songs => dispatch(receiveAllSongs(songs)))
);

export const createSong = formData => dispatch => (
  SongAPIUtil.createSong(formData).then(song => {
    dispatch(receiveSong(song));
    // <Redirect to=``/>
  })
);
