import { connect } from 'react-redux';
import { login, signup, getUser, receiveFormType } from '../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
  formType: state.session.formType,
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user)),
  getUser: (user) => dispatch(getUser(user)),
  receiveFormType: (formType) => dispatch(receiveFormType(formType))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
