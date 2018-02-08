import { combineReducers } from 'redux';
import songReducer from './song_reducer';
import profileReducer from './profile_reducer';
import playlistReducer from './playlist_reducer';

const entitiesReducer = combineReducers({
  profiles: profileReducer,
  playlists: playlistReducer
});

export default entitiesReducer;
