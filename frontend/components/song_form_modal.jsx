import React from 'react';
import AriaModal from 'react-aria-modal';
import SongUploadFormContainer from './song_upload_form_container';

class SongFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive : false
    };
    this.onModalExit = this.onModalExit.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    window.activateEdit = this.activateModal.bind(this);
    window.closeEdit = this.onModalExit.bind(this);
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.setState({ modalActive: false });
  }

  getApplicationNode() {
    return document.getElementById(this.props.loc);
  }

  onModalEnter() {
    const nav = document.getElementById("nav-wrap");
    if (nav) nav.setAttribute("style", "width: calc(100% - 17px);")
    const formModal = document.getElementById("song-form-modal");
    formModal.setAttribute("class", "out");
  }

  onModalExit() {
    const formModal = document.getElementById("song-form-modal");
    formModal.setAttribute("class", "in");
    window.setTimeout(() => {
      this.deactivateModal();
      const nav = document.getElementById("nav-wrap");
      if (nav) nav.removeAttribute("style");
    }, 300);
  }

  render() {
    const songFormModal = this.state.modalActive
      ? <AriaModal
        titleText='song-form'
        onExit={this.onModalExit}
        onEnter={this.onModalEnter}
        getApplicationNode={this.getApplicationNode}
      >
        <div id='song-form-modal'>
          <SongUploadFormContainer page={'modal'} song={window.song} />
        </div>
      </AriaModal>
    : false;

    return (
      <div>
        {songFormModal}
      </div>
    );
  }
}

export default SongFormModal;
