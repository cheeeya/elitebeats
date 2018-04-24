import React from 'react';
import { Link } from 'react-router-dom';

class PlayableSongTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { song } = this.props;
    const fullPermalink = `${song.author_url}/${song.permalink}`;
    return (
      <div className="song-tile">
        <div className="song-tile-artwork-div">
          <div
            className="song-tile-image"
            style={{ backgroundImage: `url(${song.image_url})` }}
          >
            <button
              id={`song-tile-play-button`}
              className="song-tile-playback-button"
            />
          </div>
        </div>
        <div className="song-tile-info">
          <div className="song-tile-text song-tile-title">
            <Link className="song-tile-link" to={fullPermalink}>
              {song.title}
            </Link>
          </div>
          <div className="song-tile-text song-tile-author">
            <Link className="song-tile-link" to={song.author_url}>
              {song.author_name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default PlayableSongTile;
