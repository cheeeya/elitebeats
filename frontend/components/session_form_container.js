import { connect } from 'react-redux';
import { login, signup } from '../actions/session_actions';
import SessionForm from './session_form';

import { getUser } from '../util/session_api_util';

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user)),
  getUser: (user) => getUser(user)
});

export default connect(null, mapDispatchToProps)(SessionForm);
