import { RECEIVE_ALL_SONGS, fetchAllSongs } from '../actions/song_actions';

const songReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SONGS:
      return action.songs;
    default:
      return state;
  }
}

export default songReducer;
