import { RECEIVE_USER_PROFILE } from '../actions/profile_actions';
import { merge, pick, keys } from 'lodash';

const profileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      let userData = action.userData;
      newState =  merge({}, state);
      delete newState[userData.profile_url];
      newState = merge(newState, { [userData.profile_url]: userData });
      return newState;
    default:
      return state;
  }
}

export default profileReducer;
