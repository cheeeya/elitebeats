import React from 'react';

class PlayableSongTile extends React.Component {
  constructor(props) {
    super(props);
  }
}

render () {
  return (
    <div>
      <div>
        <button
          id={`song-tile-${playbackButton}-button`}
          className="song-tile-playback-button"
        />
      </div>
    </div>
  );
}

export default PlayableSongTile;
