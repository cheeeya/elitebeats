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
    this.setState({ modalActive: false });
  }

  getApplicationNode() {
    return document.getElementById('nav-bar')
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
    return (
      <div className="session-button-div">
        <button className="session-button" id="signin-btn" onClick={this.activateModal}>Sign in</button>
        <button className="session-button" id="register-btn" onClick={this.activateModal}>Create account</button>
        {sessionFormModal}
      </div>
    );
  }
}

export default SessionFormModal;
