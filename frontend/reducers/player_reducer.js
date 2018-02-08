import { PLAY_SONG, NEXT_SONG, PREV_SONG } from '../actions/player_actions';
import { merge } from 'lodash';

const playerReducer = (state ={}, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case PLAY_SONG:
      let song = action.song;
      newState = merge(newState, state, { [song.index]: song })
      return newState;
    default:
      return state;
  }
}
