export const RECEIVE_FOLLOWER = "RECEIVE_FOLLOWER";
export const REMOVE_FOLLOWER = "REMOVE_FOLLOWER";
import * as FollowAPIUtil from '../util/follow_api_util';

const receiveFollower = (userId, followerId, userUrl, songUrl) => ({
  type: RECEIVE_FOLLOWER,
  followerId,
  userId,
  userUrl,
  songUrl
});

const removeFollower = (userId, followerId, userUrl, songUrl) => ({
  type: REMOVE_FOLLOWER,
  followerId,
  userId,
  userUrl,
  songUrl
});

export const follow = (userId, userUrl, songUrl) => dispatch => (
  FollowAPIUtil.createFollow(userId).then(
    followerId => dispatch(receiveFollower(userId, followerId, userUrl, songUrl))
  )
);

export const unfollow = (userId, userUrl, songUrl) => dispatch => (
  FollowAPIUtil.deleteFollow(userId).then(
    followerId => dispatch(removeFollower(userId, followerId, userUrl, songUrl))
  )
);
