export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
import * as SongAPIUtil from '../util/song_api_util.js';

const receiveAllSongs = songs => ({
  type: RECEIVE_ALL_SONGS,
  songs
})


export const fetchAllSongs = () => dispatch => (
  SongAPIUtil.fetchAllSongs().then(songs => dispatch(receiveAllSongs(songs)))
);
