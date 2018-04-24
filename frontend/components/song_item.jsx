import React from 'react';
import { Link } from 'react-router-dom';

class SongItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      showMore: false
    }
    this.playbackButton = this.playbackButton.bind(this);
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

  handleClick(action) {
    return (e) => {
      e.preventDefault();
      if (action === 'play') {
        if (this.props.currentPlaylist != this.props.playlist) {
          this.props.updateCurrentPlaylist(this.props.playlist);
        }
        this.props.play(this.props.song)
      }
      else {
        this.props.pause();
      }
      this.setState({ status: action });
    }
  }

  playbackButton() {
    if (this.state.status === 'play') {
      return 'pause';
    } else {
      return 'play';
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
    const playbackButton = this.playbackButton();
    let author_url = "";
    let permalink = "";
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
    return (
      <div className="song-item">
        <Link to={permalink}>
          <div className="song-artwork" style={{ backgroundImage: `url(${song.image_url})`}} />
        </Link>
        <div className="song-item-right">
          <div className="songtitle">
            <button
              id={`song-list-${playbackButton}-button`}
              className="song-list-playback-button"
              title={`P${playbackButton.slice(1)}`}
              onClick={this.handleClick(playbackButton)}
            />
            <ul className="songtitle-list">
              <li className="songtitle-list-el">
                <Link to={author_url}>
                  <span className="songtitle-author">{song.author_name}</span>
                </Link>
              </li>
              <li className="songtitle-list-el">
                <Link to={permalink}>
                  <span className="songtitle-title">{song.title}</span>
                </Link>
              </li>
            </ul>
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
