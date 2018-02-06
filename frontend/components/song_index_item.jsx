import React from 'react';
import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'play'
    }
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
    let author_url = "";
    let permalink = "";
    if (song) {
      author_url = `/${song.author_url}`;
      permalink = `${author_url}/${song.permalink}`;
    }
    return (
      <li>
        <Link to={permalink}><img className="song-artwork" src={song.image_url} /></Link>
        <button className={`${status}-button`} onClick={this.handleClick('play')}><span className="playback-button-txt">{status}</span></button>
        <div className="songtitle">
          <Link to={author_url}><span>{song.author_name}</span></Link>
          <Link to={permalink}><span>{song.title}</span></Link>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
