import { RECEIVE_USER_PROFILE, RECEIVE_PROFILE_ERRORS } from '../actions/profile_actions';
import { merge } from 'lodash';

const profileErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [];
  switch (action.type) {
    case RECEIVE_PROFILE_ERRORS:
      return action.errors;
    case RECEIVE_USER_PROFILE:
      return newState;
    default:
      return state;
  }
}

export default profileErrorsReducer;
