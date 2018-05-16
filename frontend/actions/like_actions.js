export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";
import * as LikeAPIUtil from '../util/like_api_util';

const receiveLike = (like, songUrl, authorUrl) => ({
  type: RECEIVE_LIKE,
  like,
  songUrl,
  authorUrl
});

const removeLike = (like, songUrl, authorUrl) => ({
  type: REMOVE_LIKE,
  like,
  songUrl,
  authorUrl
});

export const likeSong = (songId, songUrl, authorUrl) => dispatch => (
  LikeAPIUtil.likeSong(songId).then(
    like => dispatch(receiveLike(like, songUrl, authorUrl))
  )
);

export const unlikeSong = (likeId, songUrl, authorUrl) => dispatch => (
  LikeAPIUtil.unlikeSong(likeId).then(
    like => dispatch(removeLike(like, songUrl, authorUrl))
  )
);
