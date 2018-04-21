import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import songErrorsReducer from './song_errors_reducer';
import profileErrorsReducer from './profile_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  song: songErrorsReducer,
  profile: profileErrorsReducer
});

export default errorsReducer;
