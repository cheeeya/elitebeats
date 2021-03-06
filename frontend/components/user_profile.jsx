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
    this.toggleFollow = this.toggleFollow.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    this.onModalExit = this.onModalExit.bind(this);
    window.closeProfileEdit = this.onModalExit.bind(this);
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

  onModalEnter() {
    const nav = document.getElementById("nav-wrap");
    if (nav) nav.setAttribute("style", "width: calc(100% - 17px);");
    const formModal = document.getElementById("profile-form-modal");
    formModal.setAttribute("class", "out");
  }

  onModalExit() {
    const formModal = document.getElementById("profile-form-modal");
    formModal.setAttribute("class", "in");
    window.setTimeout(() => {
      this.deactivateModal();
      const nav = document.getElementById("nav-wrap");
      if (nav) nav.removeAttribute("style");
    }, 300);
  }

  toggleFollow(userId, userUrl) {
    return e => {
      const { currentUser, follow, unfollow, profile } = this.props;
      e.preventDefault();
      if (currentUser) {
        if (currentUser.user_followings.indexOf(userId) > -1) {
          unfollow(userId, userUrl, "");
        } else {
          follow(userId, userUrl, "");
        }
      } else {
        window.triggerLogin();
      }
    }
  }

  triggerFileUpload(inputButton) {
    return e => {
      e.preventDefault();
      if (this.props.profile.id === 1) {
        alert("Cannot update image of demo account. Please create a new personal account to access this feature!");
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
      if (file) formData.append(`user[${fileType}]`, file);
      this.props.update(formData, currentUser.id);
    }
  }

  render () {
    const { profile, currentUser, errors } = this.props;
    let tracks = {}, disabledUnlessOwner = "disabled", fNameEl = "", lNameEl= "",
        fullName = "", countryEl = "" ,cityEl = "", withCountry = "", fullLoc = "",
        followingTitle = "", followersTitle = "", tracksTitle = "", followText = "Follow";
    let tracksElement = <div className="profile-empty-tracks">
                          <img
                            className="profile-no-tracks-img"
                            src="https://res.cloudinary.com/elitebeats/image/upload/v1520851992/no-music_z6x98i.png"
                          />
                          <h4 className="empty-h4">Nothing to hear here</h4>
                        </div>;
    const editProfileFormModal = this.state.modalActive
                                ? <AriaModal
                                titleText='login-form'
                                onEnter={this.onModalEnter}
                                onExit={this.onModalExit}
                                getApplicationNode={this.getApplicationNode}
                                >
                                <div id='profile-form-modal'>
                                  <EditProfileFormContainer />
                                </div>
                              </AriaModal>
                              : false;
    if (errors.indexOf("Unable to find user.") > -1) {
      return (
        <div className="error-page">
          <div className="image-404-alt" />
          <h1 className="error-h1">We can't find that user.</h1>
          <p className="error-p">
            A report has been sent to our tech team,
            <br />
             and they're looking into the problem.
            <br />
            Please check back in a bit.
          </p>
         </div>
       );
    }
    if (currentUser && profile) {
      if (currentUser.profile_url === profile.profile_url) {
        disabledUnlessOwner = "";
      }
      if (currentUser.user_followings.indexOf(profile.id) > -1) {
        followText = "Following";
      }
    }
    if (profile) {
      if (profile.tracks) {
        tracks = Object.keys(profile.tracks.allTracks).map(el => profile.tracks.allTracks[el]);
        tracksTitle = `${tracks.length - 1} track`;
        if (tracks.length === 1 || tracks.length > 2) {
          tracksTitle += "s";
        }
        if (tracks.length > 1) {
          tracksElement = <ul className="all-tracks">
                            {
                              tracks.reverse().map(track => {
                                if (typeof track === 'object'){
                                  return (
                                    <li className="profile-song-list-item" key={track.id}>
                                      <SongItemContainer song={track} path="profile" playlist={profile.tracks.allTracks.title} />
                                    </li>
                                  )
                                }
                                return null;
                              })
                            }
                          </ul>
        }
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
      if (profile.user_followings.length === 1) {
        followingTitle = "Following 1 person";
      } else {
        followingTitle = `Following ${profile.user_followings.length} people`;
      }
      followersTitle = `${profile.user_followers.length} follower`;
      if (profile.user_followers.length === 0 || profile.user_followers.length > 1) {
        followersTitle += "s";
      }
      return (
        <section className="profile-page" id="profile-section">
          <div
            className="profile-cover"
            style={{ backgroundImage: `url(${profile.cover_url})` }}
          >
            <div
              className="profile-picture"
              style={{ backgroundImage: `url(${profile.profile_picture_url})`}}
            >
              <input
                id="profile-pic-input"
                type="file"
                onChange={this.handleFile('profile_picture')}
              />
              <button
                className={`update-button update-profile-pic ${disabledUnlessOwner}`}
                type="button"
                disabled={disabledUnlessOwner === "disabled"}
                onClick={this.triggerFileUpload('profile-pic')}
              >
                <span><i className="fas fa-camera"></i>&nbsp;&nbsp;Update image</span>
              </button>
            </div>
            <div className="profile-header">
              <div className="header-left">
                <div className="display-name-div">
                  <h1 className="display-name">{profile.display_name}</h1>
                </div>
                <div className="full-name-div">
                  {fNameEl}
                  {lNameEl}
                </div>
                <div className="location-div">
                  {cityEl}
                  {countryEl}
                </div>
              </div>
              <div className="header-right">
                <input
                  id="cover-input"
                  type="file"
                  onChange={this.handleFile('cover')}
                />
                <button
                  className={`update-button update-cover-photo ${disabledUnlessOwner}`}
                  type="button"
                  disabled={disabledUnlessOwner === "disabled"}
                  onClick={this.triggerFileUpload('cover')}
                >
                  <span><i className="fas fa-camera" />
                  &nbsp;&nbsp;Update image</span>
                </button>
              </div>
            </div>
          </div>
          <section className="profile-music">
            <div className="profile-tabs">
              <div className="profile-tab-all"><span>All</span></div>
              <button
                className={`profile-button ${disabledUnlessOwner}`}
                disabled={disabledUnlessOwner}
                onClick={this.activateModal}
              >
                <i className="fas fa-pencil-alt" />
                <span className="sm-button-text">Edit</span>
              </button>
              <button
                className={`profile-button p-follow-button
                  ${followText.toLowerCase()} ${disabledUnlessOwner ? "" : "disabled"}`}
                title={followText === "Follow" ? followText : "Unfollow"}
                type="button"
                disabled={disabledUnlessOwner ? false : true}
                onClick={this.toggleFollow(profile.id, profile.profile_url)}
              >
                {followText}
              </button>
            </div>
            <div className="profile-main">
              {tracksElement}
              <div className="profile-sidebar">
                <div className="profile-info">
                  <div className="profile-stats">
                    <div className="p-stats-div" title={followersTitle}>
                      <h4 className="stats-h4-first">Followers</h4>
                      <div className="stats-div-first">{profile.user_followers.length}</div>
                    </div>
                    <div className="p-stats-div" title={followingTitle}>
                      <h4 className="stats-h4">Following</h4>
                      <div className="stats-div">{profile.user_followings.length}</div>
                    </div>
                    <div className="p-stats-div" title={tracksTitle}>
                      <h4 className="stats-h4">Tracks</h4>
                      <div className="stats-div">
                        {Object.keys(profile.tracks.allTracks).length - 1}
                      </div>
                    </div>
                  </div>
                  <div className="profile-bio">
                    {profile.bio.split('\n').map((text, key) => {
                      return <p key={key}>{text}<br/></p>
                    })}
                  </div>
                </div>
              </div>
            </div>
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
