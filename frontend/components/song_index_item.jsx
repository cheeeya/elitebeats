import React from 'react';
import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      showMore: false
    }
    this.button = this.button.bind(this);
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

  button() {
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
    const button = this.button();
    let author_url = "";
    let permalink = "";
    if (song) {
      author_url = `/${song.author_url}`;
      permalink = `${author_url}/${song.permalink}`;
    }
    let showMoreClass = "";
    if (showMore) {
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
      <li className="song-list-item">
        <Link to={permalink}><img className="song-artwork" src={song.image_url} /></Link>
        <div className="songtitle">
          <button className="song-list-playback-button" id={`song-list-${button}-button`} onClick={this.handleClick(button)}><span className="playback-button-txt">{button}</span></button>
          <ul className="songtitle-list">
            <li className="songtitle-list-el"><Link to={author_url}><span className="songtitle-author">{song.author_name}</span></Link></li>
            <li className="songtitle-list-el"><Link to={permalink}><span className="songtitle-title">{song.title}</span></Link></li>
          </ul>
          <div className={`management-div ${disabledClass}`}>
            <button className="song-management" id="more-button" onClick={this.showMoreToggle}><span id={`more-${song.id}`}><i className="fas fa-ellipsis-h"></i>  More</span></button>
            <ul className={`more-buttons-list ${showMoreClass}`}>
              <li className="more-list-item"><button className="song-edit-button" onClick={this.handleEdit}><span>Edit</span></button></li>
              <li className="more-list-item"><button className="song-delete-button" onClick={this.handleDelete}>Delete</button></li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
