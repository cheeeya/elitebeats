import React from 'react';
import AriaModal from 'react-aria-modal';
import SongUploadFormContainer from './song_upload_form_container';

class SongFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive : false
    };
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    window.activateEdit = this.activateModal.bind(this);
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

  render() {
    const songFormModal = this.state.modalActive
      ? <AriaModal
        titleText='song-form'
        onExit={this.deactivateModal}
        getApplicationNode={this.getApplicationNode}
      >
        <div id='song-form-modal' className='modal'>
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
