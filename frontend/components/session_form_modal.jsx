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
        underlaystyle={{ paddingTop: '10px' }}
      >
        <div id='session-form-modal' className='modal'>
          <SessionFormContainer />
        </div>
      </AriaModal>
    : false;
    return (
      <div>
        <button onClick={this.activateModal}>Sign in</button>
        <button onClick={this.activateModal}>Create account</button>
        {sessionFormModal}
      </div>
    );
  }
}

export default SessionFormModal;
