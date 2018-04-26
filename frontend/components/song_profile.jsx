import React from 'react';
import { Link } from 'react-router-dom';

class SongProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      body: ""
    }
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount () {
    const { profileUrl, permalink } = this.props;
    this.props.fetchSong(profileUrl, permalink);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.status !== nextProps.status) {
      this.setState({ status: nextProps.status })
    }
  }

  handleClick(action) {
    return (e) => {
      const { pause, play, songProfile } = this.props;
      e.preventDefault();
      if (action === 'play') {
        play(songProfile);
      }
      else {
        pause();
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

  toggleFollow(userId, userUrl, songUrl) {
    return e => {
      const { currentUser, follow, unfollow } = this.props;
      e.preventDefault();
      if (currentUser.user_followings.indexOf(userId) > -1) {
        unfollow(userId, userUrl, songUrl);
      } else {
        follow(userId, userUrl, songUrl);
      }
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
    const { songProfile, currentUser, errors } = this.props;
    const { status } = this.state;
    const playbackState = status === "play" ? "pause" : "play";
    if (errors.indexOf("Unable to find song.") > -1) {
      return (
        <div className="error-page">
          <div className="image-404-alt" />
          <h1 className="error-h1">This track was not found. Maybe it has been removed.</h1>
        </div>
      );
    }
    if (!songProfile) {
      return null;
    }
    let userAvatarUrl = "https://res.cloudinary.com/elitebeats/image/upload/v1520836942/blue_v6mtey.jpg",
        comments = [], time = this.timeFormat(songProfile.created_at), genre,
        followText = "Follow", disabledIfOwner = "", followersTitle = "", tracksTitle = "";
    let commentsEl = (<div className="empty-comments-div">
                       <img
                         className="empty-comments-image"
                         src="https://res.cloudinary.com/elitebeats/image/upload/v1520941219/no-comments_f0a9ay.png"
                        />
                       <h4 className="empty-h4">Seems a little quiet over here</h4>
                       <h5 className="empty-h5">Be the first to comment on this track</h5>
                     </div>);
    if (songProfile.comments) {
      comments = Object.keys(songProfile.comments).map(el => songProfile.comments[el]).reverse();
    }
    if (currentUser) {
      userAvatarUrl = currentUser.profile_picture_url;
      if (currentUser.id === songProfile.author_id) {
        disabledIfOwner = "disabled";
      } else if (currentUser.user_followings.indexOf(songProfile.author_id) > -1) {
        followText = "Following";
      }
    }
    if (songProfile.genre !== "none") {
      genre = (<div className="header-genre"><span className="genre-tag sp-tag"># {songProfile.genre}</span></div>);
    }
    if (comments.length > 0) {
      commentsEl = (
        <div className="song-info-comments">
          <div className="song-info-comment-header">
            <div className="song-info-comment-icon" />
            <span>{comments.length} comments</span>
          </div>
          <ul className="comment-list">
            {
              comments.map(comment => {
                let isAuthor = "";
                if (currentUser && (comment.author_id === currentUser.id || songProfile.author_id === currentUser.id)) {
                  isAuthor = "comment-list-item-author";
                }
                return (
                  <li className={`comment-list-item ${isAuthor}`} key={comment.id}>
                    <div className="comment-author-avatar">
                      <Link to={`/${comment.author_url}`}>
                        <div
                          className="comment-author-avatar-image"
                          style={{ backgroundImage: `url(${comment.author_picture_url})` }}
                        />
                      </Link>
                    </div>
                    <div className="comment-main">
                      <div className="comment-author-name">
                        <Link to={`/${comment.author_url}`}>
                          {comment.author_name}
                        </Link>
                      </div>
                      <p>{comment.body}</p>
                    </div>
                    <div className="comment-extra">
                      <span>{this.timeFormat(comment.created_at)}</span>
                      <button
                        id="delete-comment-button"
                        onClick={this.handleDelete(comment.id)}
                      >
                        <div className="delete-icon"/>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
       </div>
     );
    }
    tracksTitle = `${songProfile.author_sounds} track`;
    if (songProfile.author_sounds === 0 || songProfile.author_sounds > 1) {
      tracksTitle += "s";
    }
    followersTitle = `${songProfile.author_followers.length} follower`;
    if (songProfile.author_followers.length === 0 || songProfile.author_followers.length > 1) {
      followersTitle += "s";
    }
    return (
      <section className="song-show-page">
        <div className="song-page-header">
          <div className="song-page-header-left">
            <button
              id={`song-${playbackState}-button`}
              className="song-page-playback-button playback-button"
              title={`P${playbackState.slice(1)}`}
              onClick={this.handleClick(playbackState)}
            />
            <div className="song-page-header-title">
              <div className="header-author-div">
                <Link to={`/${songProfile.author_url}`}>
                  <span className="header-author">{songProfile.author_name}</span>
                </Link>
              </div>
              <span className="header-title-songtitle">{songProfile.title}</span>
            </div>
            <div className="header-info">
              <div className="header-time"><span>{time}</span></div>
              {genre}
            </div>
          </div>
          <div
            className="song-header-artwork"
            style={{ backgroundImage: `url(${songProfile.image_url})` }}
          >
          </div>
        </div>
        <div className="song-page-main">
          <div className="song-about">
            <div className="write-comment-div">
              <div
                className="comment-user-image"
                style={{ backgroundImage: `url(${userAvatarUrl})` }}
              >
              </div>
              <div className="comment-input-div">
                <form onSubmit={this.handleSubmitComment}>
                  <input
                    className="song-comment-input"
                    type="text"
                    value={this.state.body}
                    placeholder="Write a comment"
                    onChange={this.handleComment}
                  />
                  <button className="post-comment-button" />
                </form>
              </div>
            </div>
            <div className="song-info">
              <div className="song-info-author-info">
                <Link to={`/${songProfile.author_url}`}>
                  <div
                    className="song-info-author-image"
                    style={{ backgroundImage: `url(${songProfile.author_picture_url})`}}
                  >
                  </div>
                </Link>
                <Link
                  to={`/${songProfile.author_url}`}
                  title={`Visit ${songProfile.author_name}'s profile`}
                >
                  <span className="song-info-author-name">{songProfile.author_name}</span>
                </Link>
                <div className="song-info-author-details">
                  <div className="user-details" title={followersTitle}>
                    <div className="icon-followers"/>
                    <span>{songProfile.author_followers.length}</span>
                  </div>
                  <div className="user-details" title={tracksTitle}>
                    <div className="icon-sounds"/>
                    <span>{songProfile.author_sounds}</span>
                  </div>
                </div>
                <button
                  className={`follow-button p-follow-button ${followText.toLowerCase()} ${disabledIfOwner}`}
                  type="button"
                  title={followText === "Follow" ? followText : "Unfollow"}
                  onClick={this.toggleFollow(songProfile.author_id, songProfile.author_url,
                    `${songProfile.author_url}/${songProfile.permalink}`)}
                  disabled={disabledIfOwner}
                >
                  {followText}
                </button>
              </div>
              <div className="song-info-main">
                <div className="song-info-description">
                  {songProfile.description.split('\n').map((text, key) => {
                    return <p key={key}>{text}<br/></p>
                  })}
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
