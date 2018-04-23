import { RECEIVE_ALL_USERS } from '../actions/user_actions';
import { RECEIVE_FOLLOWER, REMOVE_FOLLOWER } from '../actions/follow_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {}, followers = [];
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      newState = merge({}, state, action.users);
      return newState;
    case RECEIVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userId]) {
        followers = newState[action.userId].user_followers;
        if (!followers.indexOf(action.followerId) > -1) {
          followers.push(action.followerId);
        }
      }
      return newState;
    case REMOVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userId]) {
        followers = newState[action.userId].user_followers;
        let index = followers.indexOf(action.followerId);
        if (index > -1 ) {
          followers.splice(index, 1);
        }
      }
      return newState;
    default:
      return state;
  }
}

export default usersReducer;
