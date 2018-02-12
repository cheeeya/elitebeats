import { combineReducers } from 'redux';
import songProfileReducer from './song_profile_reducer';
import profileReducer from './profile_reducer';
import playlistReducer from './playlist_reducer';


const entitiesReducer = combineReducers({
  profiles: profileReducer,
  playlists: playlistReducer,
  songProfiles: songProfileReducer
});

export default entitiesReducer;
