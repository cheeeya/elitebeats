// import { RECEIVE_CURRENT_USER } from '../actions/session_actions';


const _nullState = {
  current_user: null
}

const sessionReducer = (state = _nullState, action) => {
  Object.freeze(state)
  switch (action.type) {
    default:
      return state;
  }
}

export default sessionReducer;
