import React from 'react';
import { Howl, Howler } from 'howler';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'play'
    }
    console.log(this.props.song);
    this.songHowl = new Howl({
      src: [this.props.song.song_url]
    });
  }

  handleClick(action) {
    return (e) => {
      e.preventDefault();
      if (this.state.status === 'play') {
        this.songHowl.play();
        this.setState({ status: 'pause' });
      } else {
        this.songHowl.pause();
        this.setState({ status: 'play' });
      }
    }
  }

  render() {
    const { song } = this.props;
    const { status } = this.state;
    return (
      <li>
        <img className="song-artwork" src={song.image_url} />
        <button className={`${status}-button`} onClick={this.handleClick('play')}><span>{status}</span></button>
        {song.title}
      </li>
    );
  }
}

export default SongIndexItem;
