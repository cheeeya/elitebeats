import { RECEIVE_SONG_PROFILE, RECEIVE_SONG_PROFILE_ERRORS } from '../actions/song_actions';

const songProfileErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [];
  switch (action.type) {
    case RECEIVE_SONG_PROFILE:
      return newState;
    case RECEIVE_SONG_PROFILE_ERRORS:
      return action.errors;
    default:
      return state;
  }
}

export default songProfileErrorsReducer;
