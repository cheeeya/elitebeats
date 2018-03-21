import React from 'react';
import { Link } from 'react-router-dom';

class SongProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      body: ""
    }
    this.playbackButton = this.playbackButton.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(commentId) {
    return (e) => {
      e.preventDefault();
      this.props.deleteComment(commentId);
    }
  }

  handleSubmitComment(e) {
    e.preventDefault();
    let comment = { body: this.state.body };
    this.props.postComment(comment, this.props.songProfile.id).then(
      this.setState({ body: "" })
    )
  }

  handleComment(e) {
    e.preventDefault();
    this.setState({ body: e.target.value });
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
          elapsedTime = elapsedTime * 60;
          timeString = " second";
        }
      }
    }
    elapsedTime = Math.floor(elapsedTime);
    if (elapsedTime > 0) {
      timeString = elapsedTime + timeString;
      if (elapsedTime > 1) {
        timeString += "s";
      }
    } else {
      timeString = 1 + timeString;
    }
    return timeString+= " ago";
  }

  render() {
    const playbackButton = this.playbackButton();
    const { songProfile, currentUser } = this.props;
    let userAvatarUrl = "https://res.cloudinary.com/elitebeats/image/upload/v1520836942/blue_v6mtey.jpg",
        comments = [];
    let commentsEl = <div className="empty-comments-div">
                       <img className="empty-comments-image" src="http://res.cloudinary.com/elitebeats/image/upload/v1520941219/no-comments_f0a9ay.png"/>
                       <h4 className="empty-h4">Seems a little quiet over here</h4>
                       <h5 className="empty-h5">Be the first to comment on this track</h5>
                     </div>
    if (!songProfile) {
      return null;
    }
    if (songProfile.comments) {
      comments = Object.values(songProfile.comments).reverse();
    }
    if (currentUser) {
      userAvatarUrl = currentUser.profile_picture_url;
    }
    let time = this.timeFormat(songProfile.created_at);
    let genre;
    if (songProfile.genre != "none") {
      genre = (<div className="header-genre"><span># {songProfile.genre}</span></div>)
    }
    if (comments.length > 0) {
      commentsEl = <div className="song-info-comments">
                    <div className="song-info-comment-header">
                      <div className="song-info-comment-icon"/>
                      <span>{comments.length} comments</span>
                    </div>
                    <ul className="comment-list">
                      {
                        comments.map(comment => {
                          let isAuthor = "";
                          if (currentUser && comment.author_id == currentUser.id) {
                            isAuthor = "comment-list-item-author";
                          }
                          return (
                            <li className={`comment-list-item ${isAuthor}`} key={comment.id}>
                              <div className="comment-author-avatar">
                                <Link to={`/${comment.author_url}`}><div className="comment-author-avatar-image" style={{ backgroundImage: `url(${comment.author_picture_url})` }}></div></Link>
                              </div>
                              <div className="comment-main">
                                <div className="comment-author-name"><Link to={`/${comment.author_url}`}>{comment.author_name}</Link></div>
                                <p>{comment.body}</p>
                              </div>
                              <div className="comment-extra">
                                <span>{this.timeFormat(comment.created_at)}</span>
                                <button id="delete-comment-button" onClick={this.handleDelete(comment.id)}><div className="delete-icon"/></button>
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                 </div>
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
          <div className="song-header-artwork" style={{ backgroundImage: `url(${songProfile.image_url})` }}></div>
        </div>
        <div className="song-page-main">
          <div className="song-about">
            <div className="write-comment-div">
              <div className="comment-user-image" style={{ backgroundImage: `url(${userAvatarUrl})` }}></div>
              <div className="comment-input-div">
                <form onSubmit={this.handleSubmitComment}>
                  <input type="text" className="song-comment-input" placeholder="Write a comment" onChange={this.handleComment} value={this.state.body}/>
                  <button className="post-comment-button"/>
                </form>
              </div>
            </div>
            <div className="song-info">
              <div className="song-info-author-info">
                <Link to={`/${songProfile.author_url}`}><div className="song-info-author-image" style={{ backgroundImage: `url(${songProfile.author_picture_url})`}}></div></Link>
                <Link to={`/${songProfile.author_url}`}><span className="song-info-author-name">{songProfile.author_name}</span></Link>
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
                {commentsEl}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SongProfile;
