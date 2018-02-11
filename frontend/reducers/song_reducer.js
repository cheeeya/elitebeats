import { RECEIVE_ALL_SONGS, RECEIVE_SONG, REMOVE_SONG } from '../actions/song_actions';
import { merge } from 'lodash';
const songReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_SONGS:
      newState = merge({}, action.allSongs);
      delete newState.title;
      return newState;
    case RECEIVE_SONG:
      let song = action.song;
      newState = merge(newState, state, { [song.id]: song });
      return newState;
    case REMOVE_SONG:
      newState = merge({}, state, { [action.song.id]: null });
      return newState;
    default:
      return state;
  }
}

export default songReducer;
