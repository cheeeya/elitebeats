import { connect } from 'react-redux';
import { receiveFormType } from '../actions/session_actions';
import Splash from './splash';

const mapDispatchToProps = dispatch => ({
  receiveFormType: (formType) => dispatch(receiveFormType(formType))
});

export default connect(null, mapDispatchToProps) (Splash);
