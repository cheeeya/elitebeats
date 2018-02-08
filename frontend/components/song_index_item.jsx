import React from 'react';
import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
    this.button = this.button.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.status !== nextProps.status) {
      this.setState({ status: nextProps.status })
    }
  }

  handleClick(action) {
    return (e) => {
      e.preventDefault();
      if (action === 'play') {
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

  render() {
    const { song } = this.props;
    const { status } = this.state;
    const button = this.button();
    let author_url = "";
    let permalink = "";
    if (song) {
      author_url = `/${song.author_url}`;
      permalink = `${author_url}/${song.permalink}`;
    }
    return (
      <li>
        <Link to={permalink}><img className="song-artwork" src={song.image_url} /></Link>
        <button className={`${button}-button`} onClick={this.handleClick(button)}><span className="playback-button-txt">{button}</span></button>
        <div className="songtitle">
          <Link to={author_url}><span className="songtitle-author">{song.author_name}</span></Link>
          <Link to={permalink}><span className="songtitle-title">{song.title}</span></Link>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
