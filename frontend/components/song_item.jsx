import React from 'react';
import { Link } from 'react-router-dom';

class SongItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      showMore: false
    }
    this.showMoreToggle = this.showMoreToggle.bind(this);
    this.closeShowMore = this.closeShowMore.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.status !== nextProps.status) {
      this.setState({ status: nextProps.status })
    }
  }

  showMoreToggle(e) {
    e.preventDefault();
    let showMore = !this.state.showMore;
    this.setState({ showMore });
  }

  closeShowMore(e) {
    e.preventDefault();
    if (e.target.id !== `more-${this.props.song.id}`) {
      this.setState({ showMore: false });
    }
  }

  handlePlayback(action) {
    return (e) => {
      const { currentPlaylist, pause, play,
        playlist, song, updateCurrentPlaylist } = this.props;
      e.preventDefault();
      if (action === 'play') {
        if (currentPlaylist != playlist) {
          updateCurrentPlaylist(playlist);
        }
        play(song);
      }
      else {
        pause();
      }
      this.setState({ status: action });
    }
  }

  handleEdit(e) {
    e.preventDefault();
    window.song = this.props.song;
    window.activateEdit();
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteSong(this.props.song.id);
  }

  render() {
    const { song } = this.props;
    const { status, showMore } = this.state;
    const playbackState = status === "play" ? "pause" : "play";
    let numComments = 0;
    let author_url = "", permalink = "", songTagElement = "";
    if (song) {
      author_url = `/${song.author_url}`;
      permalink = `${author_url}/${song.permalink}`;
    }
    let showMoreClass = "";
    let activeClass = "";
    if (showMore) {
      activeClass = "active-button";
      showMoreClass = "display-list";
      document.getElementById('root').addEventListener("click", this.closeShowMore, true);
    } else {
      document.getElementById('root').removeEventListener("click", this.closeShowMore, true);
    }
    let disabledClass = "disabled";
    if (this.props.path !== 'stream' && this.props.currentUser) {
      if (this.props.currentUser.id === song.author_id) {
        disabledClass = "";
      }
    }
    if (song.genre !== "none") {
      songTagElement = (
        <span className="genre-tag list-tag">#&nbsp;{song.genre}</span>
      );
    }
    if (song.comments) {
      numComments = Object.keys(song.comments).length;
    }
    return (
      <div className="song-item">
        <div className="song-item-left">
          <Link to={permalink}>
            <div className="song-artwork" style={{ backgroundImage: `url(${song.image_url})`}} />
          </Link>
        </div>
        <div className="song-item-right">
          <div className="song-header">
            <button
              id={`song-${playbackState}-button`}
              className="song-list-playback-button playback-button"
              title={`P${playbackState.slice(1)}`}
              onClick={this.handlePlayback(playbackState)}
              />
            <div className="songtitle">
              <div className="songtitle-list-el">
                <Link to={author_url}>
                  <span className="songtitle-author">{song.author_name}</span>
                </Link>
              </div>
              <div className="songtitle-list-el">
                <Link to={permalink}>
                  <span className="songtitle-title">{song.title}</span>
                </Link>
              </div>
            </div>
            <div className="song-genre">
              {songTagElement}
            </div>
          </div>
          <div className="song-stats">
            <div
              className="song-stats-el"
              title={`${song.total_plays} play${song.total_plays === 1 ? "" : "s"}`}
            >
              <div id="playcount-icon" className="list-icon" />
              &nbsp;<span className="stat-span">{song.total_plays}</span>
            </div>
            <div
              className="song-stats-el"
              title={`${numComments} comment${numComments === 1 ? "" : "s"}`}
            >
              <Link to={permalink} className="song-stats-link">
                <div id="list-comment-icon" className="comment-icon list-icon" />
                &nbsp;<span className="stat-span">{numComments}</span>
              </Link>
            </div>
          </div>
          <div className={`management-div ${disabledClass}`}>
            <button
              id="more-button"
              className={`song-management ${activeClass}`}
              onClick={this.showMoreToggle}
            >
              <i className="fas fa-ellipsis-h" id={`more-${song.id}`} />
            </button>
            <ul className={`more-buttons-list ${showMoreClass}`}>
              <li className="more-list-item">
                <button className="song-management-button" onClick={this.handleEdit}>
                  <i className="fas fa-pencil-alt" />
                  <span className="sm-button-text">Edit Track</span>
                </button>
              </li>
              <li className="more-list-item">
                <button className="song-management-button" onClick={this.handleDelete}>
                  <i className="fas fa-trash" />
                  <span className="sm-button-text">Delete Track</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SongItem;
