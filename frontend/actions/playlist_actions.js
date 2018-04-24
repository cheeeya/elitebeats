export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
import * as SongAPIUtil from '../util/song_api_util';


export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});

export const fetchTrendingList = () => dispatch => (
  SongAPIUtil.fetchTrendingList().then(
    trendingList => dispatch(receivePlaylist(trendingList))
  )
);
