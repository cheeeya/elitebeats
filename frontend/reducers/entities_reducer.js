import { combineReducers } from 'redux';
import songProfileReducer from './song_profile_reducer';
import profileReducer from './profile_reducer';
import playlistReducer from './playlist_reducer';
import usersReducer from './users_reducer';


const entitiesReducer = combineReducers({
  profiles: profileReducer,
  playlists: playlistReducer,
  songProfiles: songProfileReducer,
  userList: usersReducer
});

export default entitiesReducer;
