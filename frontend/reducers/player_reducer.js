import { PLAY_SONG, NEXT_SONG, PREV_SONG, PAUSE_SONG, RECEIVE_CURRENT_PLAYLIST } from '../actions/player_actions';
import { merge } from 'lodash';

const _default = {
  currentPlaylist: "",
  currentSong: { status: "" }
}

const playerReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = {};
  let currentSong = {};
  switch (action.type) {
    case RECEIVE_CURRENT_PLAYLIST:
      let currentPlaylist = action.playlist;
      newState = merge(newState, state, { currentPlaylist });
      return newState;
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
