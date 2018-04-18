export const RECEIVE_FOLLOWER = "RECEIVE_FOLLOWER";
export const REMOVE_FOLLOWER = "REMOVE_FOLLOWER";
import * as FollowAPIUtil from '../util/follow_api_util';

const receiveFollower = (userId, followerId, userUrl) => ({
  type: RECEIVE_FOLLOWER,
  followerId,
  userId,
  userUrl
});

const removeFollower = (userId, followerId, userUrl) => ({
  type: REMOVE_FOLLOWER,
  followerId,
  userId,
  userUrl
});

export const follow = (userId, userUrl) => dispatch => (
  FollowAPIUtil.createFollow(userId).then(
    followerId => dispatch(receiveFollower(userId, followerId, userUrl))
  )
);

export const unfollow = (userId, userUrl) => dispatch => (
  FollowAPIUtil.deleteFollow(userId).then(
    followerId => dispatch(removeFollower(userId, followerId, userUrl))
  )
);
