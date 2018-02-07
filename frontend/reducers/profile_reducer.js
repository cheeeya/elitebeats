import { RECEIVE_USER_PROFILE } from '../actions/profile_actions';
import { merge } from 'lodash';

const profileReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_USER_PROFILE:
      let userData = action.userData;
      return merge(newState, state, { [userData.profile_url]: userData })
    default:
      return state;
  }
}

export default profileReducer;
