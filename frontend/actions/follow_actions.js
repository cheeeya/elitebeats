import * as FollowAPIUtil from '../util/follow_api_util';

export const follow = userId => dispatch => (
  FollowAPIUtil.createFollow(userId)
);

export const unfollow = followId => dispatch => (
  FollowAPIUtil.deleteFollow(followId)
);
