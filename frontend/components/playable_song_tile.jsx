import React from 'react';
import { Link } from 'react-router-dom';

class PlayableSongTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.status !== nextProps.status) {
      this.setState({ status: nextProps.status })
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

  render () {
    const { status } = this.state;
    const { song } = this.props;
    const playbackState = status === "play" ? "pause" : "play";
    const fullPermalink = `${song.author_url}/${song.permalink}`;
    return (
      <div className="song-tile">
        <div className="song-tile-artwork-div">
          <Link to={fullPermalink}>
            <div
              className="song-tile-image"
              style={{ backgroundImage: `url(${song.image_url})` }}
            >
              <div className="centered-button">
                <button
                  id={`song-${playbackState}-button`}
                  className="song-tile-playback-button playback-button"
                  type="button"
                  onClick={this.handlePlayback(playbackState)}
                  style={status === "play" ? { opacity: '1' } : null}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="song-tile-info">
          <div className="song-tile-text song-tile-title">
            <Link to={fullPermalink} className="song-tile-link">
              {song.title}
            </Link>
          </div>
          <div className="song-tile-text song-tile-author">
            <Link to={song.author_url} className="song-tile-link">
              {song.author_name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default PlayableSongTile;
