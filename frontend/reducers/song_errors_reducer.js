import { RECEIVE_SONG, RECEIVE_SONG_ERRORS, REMOVE_SONG } from '../actions/song_actions';

const songErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [];
  switch (action.type) {
    case RECEIVE_SONG:
      return newState;
    case RECEIVE_SONG_ERRORS:
      return action.errors;
    case REMOVE_SONG:
      return newState;
    default:
      return state;
  }
}

export default songErrorsReducer;
