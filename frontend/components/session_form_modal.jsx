import React from 'react';
import AriaModal from 'react-aria-modal';
import SessionFormContainer from './session_form_container';

class SessionFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive : false
    };
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.props.receiveFormType("");
    this.setState({ modalActive: false });
  }

  getApplicationNode() {
    return document.getElementById(this.props.loc);
  }

  render() {
    const sessionFormModal = this.state.modalActive
      ? <AriaModal
        titleText='login-form'
        onExit={this.deactivateModal}
        getApplicationNode={this.getApplicationNode}
      >
        <div id='session-form-modal' className='modal'>
          <SessionFormContainer />
        </div>
      </AriaModal>
    : false;

    let buttonElements = (
      <div className={`${this.props.loc}-session-bttns`}>
        <button className="session-button" id="signin-btn" onClick={this.activateModal} >Sign in</button>
        <button className="session-button" id="register-btn" onClick={this.activateModal} >Create account</button>
      </div>
    );

    if (this.props.loc === 'splash-notice') {
      buttonElements = (
        <div className="splash-bttn">
          <button className="session-button" id="big-signup-bttn" onClick={this.activateModal} >Sign Up for Free</button>
        </div>
      )
    }
    return (
      <div className="session-button-div">
        {buttonElements}
        {sessionFormModal}
      </div>
    );
  }
}

export default SessionFormModal;
