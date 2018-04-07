import React from 'react';
import AriaModal from 'react-aria-modal';
import SongItemContainer from './song_item_container';
import SongFormModal from './song_form_modal';
import EditProfileFormContainer from './edit_profile_form_container';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    window.closeProfileEdit = this.deactivateModal.bind(this);
  }

  componentDidMount() {
    let profile_url = this.props.location.pathname.split("/")[1];
    this.props.fetchUserProfile(profile_url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.updateRequired) {
      let profile_url = nextProps.location.pathname.split("/")[1];
      this.props.fetchUserProfile(profile_url);
      this.props.finishUpdate();
    }
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.setState({ modalActive: false });
  }

  getApplicationNode() {
    return document.getElementById("profile-section");
  }

  triggerFileUpload(inputButton) {
    return e => {
      e.preventDefault();
      if (this.props.profile.id === 1) {
        alert("Cannot update profile picture of demo account. Please create a new personal account to access this feature!");
        return;
      }
      document.getElementById(`${inputButton}-input`).click();
    }
  }

  handleFile(fileType) {
    return (e) => {
      e.preventDefault();
      const { currentUser } = this.props;
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file });
      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.setState({ imageUrl: "", imageFile: null });
      }
      const formData = new FormData();
      formData.append("user[id]", currentUser.id);
      if (file) formData.append("user[profile_picture]", file);
      this.props.update(formData, currentUser.id);
    }
  }

  render () {
    const { profile, currentUser } = this.props;
    let tracks = {}, disabledUnlessOwner = "disabled", fNameEl = "", lNameEl= "",
        fullName = "", countryEl = "" ,cityEl = "", withCountry = "", fullLoc = "";
    let tracksElement = <div className="profile-empty-tracks">
                          <img className="profile-no-tracks-img" src="https://res.cloudinary.com/elitebeats/image/upload/v1520851992/no-music_z6x98i.png"></img>
                          <h4 className="empty-h4">Nothing to hear here</h4>
                        </div>;
    const editProfileFormModal = this.state.modalActive
                                ? <AriaModal
                                titleText='login-form'
                                onExit={this.deactivateModal}
                                getApplicationNode={this.getApplicationNode}
                                >
                                <div id='profile-form-modal' className='modal'>
                                  <EditProfileFormContainer />
                                </div>
                              </AriaModal>
                              : false;
    if (currentUser && profile) {
      if (currentUser.profile_url === profile.profile_url) {
        disabledUnlessOwner = "";
      }
    }
    if (profile) {
      if (profile.tracks) {
        tracks = profile.tracks;
        if (Object.values(tracks.allTracks).length > 1) {
          tracksElement = <ul className="all-tracks">
                            {
                              Object.values(tracks.allTracks).reverse().map(track => {
                                if (typeof track === 'object'){
                                  return (
                                    <li className="profile-song-list-item" key={track.id}>
                                      <SongItemContainer song={track} path="profile" playlist={tracks.allTracks.title}/>
                                    </li>
                                  )
                                }
                                return null;
                              })
                            }
                          </ul>
        }
        if (profile.first_name) {
          fNameEl = <h2 className="header-data">{profile.first_name}</h2>
          fullName = "full-data";
        }
        if (profile.last_name) {
          lNameEl = <h2 className={`header-data ${fullName}`}>{profile.last_name}</h2>
        }
        if (profile.city) {
          if (profile.country) {
            withCountry = ",";
          }
          cityEl = <h2 className="header-data">{profile.city}{withCountry}</h2>
          fullLoc = "full-data";
        }
        if (profile.country) {
          countryEl = <h2 className={`header-data ${fullLoc}`}>{profile.country}</h2>
        }
      }
      return (
        <section className="profile-page" id="profile-section">
          <div className="profile-cover" style={{ backgroundImage: `url(${profile.cover_url})` }}>
            <div className="profile-picture" style={{ backgroundImage: `url(${profile.profile_picture_url})`}}>
              <input id="profile-pic-input" type="file" onChange={this.handleFile('profile_picture')}></input>
              <button onClick={this.triggerFileUpload('profile-pic')}
                className={`update-button update-profile-pic ${disabledUnlessOwner}`}
                disabled={disabledUnlessOwner === "disabled"}
                type="button">
                <span><i className="fas fa-camera"></i>&nbsp;&nbsp;Update image</span>
              </button>
            </div>
            <div className="profile-header">
              <h1 className="display-name"><span>{profile.display_name}</span></h1>
              <div className="full-name-div">
                {fNameEl}
                {lNameEl}
              </div>
              <div className="location-div">
                {cityEl}
                {countryEl}
              </div>
              <button className="update-button update-cover-photo" type="button">Update Image</button>
            </div>
          </div>
          <section className="profile-music">
            <div className="profile-info">
              <div className="profile-tab-all"><span>All</span></div>
              <button className={`profile-edit-button ${disabledUnlessOwner}`}
                disabled={disabledUnlessOwner} onClick={this.activateModal}>
                <i className="fas fa-pencil-alt" /><span className="sm-button-text">Edit</span>
              </button>
            </div>
            {tracksElement}
          </section>
          <SongFormModal loc="profile-page"/>
          {editProfileFormModal}
        </section>
      );
    } else {
      return null;
    }
  }
}

export default UserProfile;
