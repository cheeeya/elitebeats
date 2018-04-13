export const RECEIVE_FOLLOWER = "RECEIVE_FOLLOWER";
export const REMOVE_FOLLOWER = "REMOVE_FOLLOWER";
import * as FollowAPIUtil from '../util/follow_api_util';

const receiveFollower = (userId, followerId) => ({
  type: RECEIVE_FOLLOWER,
  followerId,
  userId
});

const removeFollower = (userId, followerId) => ({
  type: REMOVE_FOLLOWER,
  followerId,
  userId
});

export const follow = userId => dispatch => (
  FollowAPIUtil.createFollow(userId).then(
    followerId => dispatch(receiveFollower(userId, followerId))
  )
);

export const unfollow = userId => dispatch => (
  FollowAPIUtil.deleteFollow(userId).then(
    followerId => dispatch(removeFollower(userId, followerId))
  )
);
