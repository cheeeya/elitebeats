import { combineReducers } from 'redux';
import songReducer from './song_reducer';

const entitiesReducer = combineReducers({
  songs: songReducer
});

export default entitiesReducer;
