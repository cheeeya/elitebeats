import React from 'react';
import SongItemContainer from './song_item_container';
import SongFormModal from './song_form_modal';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
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

  triggerFileUpload(inputButton) {
    return e => {
      e.preventDefault();
      if (this.props.profile.display_name === "Demo") {
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
    let tracks = {};
    let isOwner = "disabled";
    let tracksElement = <div className="profile-empty-tracks">
                          <img className="profile-no-tracks-img" src="http://res.cloudinary.com/elitebeats/image/upload/v1520851992/no-music_z6x98i.png"></img>
                          <h4 className="profile-empty-h4">Nothing to hear here</h4>
                        </div>;
    if (currentUser && profile) {
      if (currentUser.profile_url === profile.profile_url) {
        isOwner = "";
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
      }
      return (
        <section className="profile-page">
          <div className="profile-cover" style={{ backgroundImage: `url(${profile.cover_url})` }}>
            <div className="profile-picture" style={{ backgroundImage: `url(${profile.profile_picture_url})`}}>
              <input id="profile-pic-input" type="file" onChange={this.handleFile('profile_picture')}></input>
              <button onClick={this.triggerFileUpload('profile-pic')} className={`update-profile-pic ${isOwner}`} disabled={isOwner === "disabled"}><span><i className="fas fa-camera"></i>  Update image</span></button>
            </div>
            <div className="profile-header">
              <h1 className="display-name"><span>{this.props.profile.display_name}</span></h1>
              <h2 className="full-name"></h2>
            </div>
          </div>
          <section className="profile-music">
            <div className="profile-tabs">
              <div className="profile-tab-all"><span>All</span></div>
            </div>
            {tracksElement}
          </section>
          <SongFormModal loc="profile-page"/>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default UserProfile;
