export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
import * as LikeAPIUtil from '../util/like_api_util';

const receiveLike = (like, songUrl, songId) => ({
  type: RECEIVE_LIKE,
  like,
  songUrl
});

const removeLike = (like, songUrl) => ({
  type: REMOVE_LIKE,
  like,
  songUrl
});

export const likeSong = (songId, songUrl) => dispatch => (
  LikeAPIUtil.likeSong(songId).then(
    like => dispatch(receiveLike(like, songUrl))
  )
);

export const unlikeSong = (likeId, songUrl) => dispatch => (
  LikeAPIUtil.unlikeSong(likeId).then(
    like => dispatch(removeLike(like, songUrl))
  )
);
