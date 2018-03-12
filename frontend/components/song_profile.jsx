import React from 'react';
import { Link } from 'react-router-dom';

class SongProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
    this.playbackButton = this.playbackButton.bind(this);
  }

  componentDidMount () {
    const { profileUrl, permalink } = this.props;
    this.props.fetchSong(profileUrl, permalink);
  }

  playbackButton() {
    if (this.state.status === 'play') {
      return 'pause';
    } else {
      return 'play';
    }
  }

  handleClick(action) {
    return (e) => {
      e.preventDefault();
      if (action === 'play') {
        this.props.play(this.props.songProfile)
      }
      else {
        this.props.pause();
      }
      this.setState({ status: action });
    }
  }

  timeFormat(createdAt) {
    let postDate = new Date(createdAt);
    let now = new Date();
    let elapsedTime = (now - postDate) / 8.64e7;
    let timeString = " day";
    if (elapsedTime > 30) {
      elapsedTime = elapsedTime / 30;
      timeString = " month";
      if (elapsedTime >= 12) {
        elapsedTime = elapsedTime / 12;
        timeString = " year";
      }
    } else if (elapsedTime < 1) {
      elapsedTime = elapsedTime * 24;
      timeString = " hour";
      if (elapsedTime < 1) {
        elapsedTime = elapsedTime * 60;
        timeString = " minute";
        if (elapsedTime < 1) {
          timeString = "less than 1 minute";
        }
      }
    }
    elapsedTime = Math.floor(elapsedTime);
    if (elapsedTime > 0) {
      timeString = elapsedTime + timeString;
      if (elapsedTime > 1) {
        timeString += "s";
      }
    }
    return timeString+= " ago";
  }

  render() {
    const playbackButton = this.playbackButton();
    const { songProfile, currentUser } = this.props;
    let userAvatarUrl = "http://res.cloudinary.com/elitebeats/image/upload/v1520836942/blue_v6mtey.jpg";
    console.log(songProfile);
    if (!songProfile) {
      return null;
    }
    if (currentUser) {
      userAvatarUrl = currentUser.profile_picture_url;
    }
    let time = this.timeFormat(songProfile.created_at);
    let genre;
    if (songProfile.genre != "none") {
      genre = (<div className="header-genre"><span># {songProfile.genre}</span></div>)
    }
    return (
      <section className="song-show-page">
        <div className="song-page-header">
          <div className="song-page-header-left">
            <button className="song-page-playback-button" id={`song-page-${playbackButton}-button`} onClick={this.handleClick(playbackButton)}><span className="playback-button-txt">{playbackButton}</span></button>
            <div className="song-page-header-title">
              <div className="header-author-div"><Link to={`/${songProfile.author_url}`}><span className="header-author">{songProfile.author_name}</span></Link></div>
              <span className="header-title-songtitle">{songProfile.title}</span>
            </div>
            <div className="header-info">
              <div className="header-time"><span>{time}</span></div>
              {genre}
            </div>
          </div>
          <div className="song-header-artwork" style={{ backgroundImage: `url(${songProfile.image_url})`}}></div>
        </div>
        <div className="song-page-main">
          <div className="song-about">
            <div className="write-comment-div">
              <div className="comment-user-image" style={{ backgroundImage: `url(${userAvatarUrl})`}}></div>
              <div className="comment-input-div">
                <input type="text" className="song-comment-input" placeholder="Write a comment"></input>
              </div>
            </div>
            <div className="song-info">
              <div className="song-info-author-info">
                <div className="song-info-author-image" style={{ backgroundImage: `url(${songProfile.author_picture_url})`}}></div>
                <span className="song-info-author-name">{songProfile.author_name}</span>
                <div className="song-info-author-details">
                  <div className="song-info-author-icon-followers"></div>
                  <span>0</span>
                  <div className="song-info-author-icon-sounds"></div>
                  <span>{songProfile.author_sounds}</span>
                </div>
              </div>
              <div className="song-info-main">
                <div className="song-info-description">
                  {songProfile.description}
                </div>
                <div className="song-info-comments">
                  <div className="song-info-comment-header">
                    <div className="song-info-comment-icon"></div>
                    <span>{songProfile.comments.length} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SongProfile;
