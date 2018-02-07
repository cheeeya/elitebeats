import { combineReducers } from 'redux';
import songReducer from './song_reducer';
import profileReducer from './profile_reducer';

const entitiesReducer = combineReducers({
  songs: songReducer,
  profiles: profileReducer
});

export default entitiesReducer;
