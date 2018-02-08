import { PLAY_SONG, NEXT_SONG, PREV_SONG, PAUSE_SONG } from '../actions/player_actions';
import { merge } from 'lodash';

const _default = {
  currentSong: { status: "" },
}

const playerReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = {};
  let currentSong = {};
  switch (action.type) {
    case PLAY_SONG:
      currentSong = merge({}, action.song, { status: 'play' });
      newState = merge(newState, state, { currentSong });
      return newState;
    case PAUSE_SONG:
      currentSong = merge({}, state.currentSong, { status: 'pause' });
      newState = merge(newState, state, { currentSong });
      return newState;
    default:
      return state;
  }
}

export default playerReducer;
