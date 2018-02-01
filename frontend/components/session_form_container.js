import { connect } from 'react-redux';
import { login, signup, getUser } from '../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
  formType: state.session.formType,
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user)),
  getUser: (user) => dispatch(getUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
