import { RECEIVE_ALL_SONGS, RECEIVE_SONG } from '../actions/song_actions';
import { merge } from 'lodash';
const songReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_ALL_SONGS:
      return action.songs;
    case RECEIVE_SONG:
      let song = action.song;
      newState = merge(newState, state, { [song.id]: song });
      return newState;
    default:
      return state;
  }
}

export default songReducer;
