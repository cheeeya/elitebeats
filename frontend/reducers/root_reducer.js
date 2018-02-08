import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import entitiesReducer from './entities_reducer';
import playerReducer from './player_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  player: playerReducer,
  errors: errorsReducer
});

export default rootReducer;
