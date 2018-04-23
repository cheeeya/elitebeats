import { RECEIVE_USER_PROFILE } from '../actions/profile_actions';
import { RECEIVE_FOLLOWER, REMOVE_FOLLOWER } from '../actions/follow_actions';
import { merge, pick, keys } from 'lodash';

const profileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {}, followers = [];
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      let userData = action.userData;
      newState =  merge({}, state);
      delete newState[userData.profile_url];
      newState = merge(newState, { [userData.profile_url]: userData });
      return newState;
    case RECEIVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userUrl]) {
        followers = newState[action.userUrl].user_followers;
        if (!followers.indexOf(action.followerId) > -1) {
          followers.push(action.followerId);
        }
      }
      return newState;
    case REMOVE_FOLLOWER:
      newState = merge({}, state);
      if (newState[action.userUrl]) {
        followers = newState[action.userUrl].user_followers;
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

export default profileReducer;
