import React from 'react';
import { Howl, Howler } from 'howler';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.button = this.button.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.song || this.props.song.id != nextProps.song.id) {
      if (this.songHowl) {
        this.songHowl.unload();
      }
      this.songHowl =  new Howl({
        src: [nextProps.song.song_url],
        preload: true
      });
    }
    this.playbackControl(nextProps.song.status)
  }

  handleClick(action) {
    return (e) => {
      e.preventDefault();
      this.playbackControl(action);
      this.props[action](this.props.song);
    }
  }

  playbackControl(action) {
    if (action === 'play') {
      this.songHowl.play();
    } else {
      this.songHowl.pause();
    }
    this.setState({ status: action });
  }

  button() {
    if (this.state.status === 'play') {
      return 'pause';
    } else {
      return 'play';
    }
  }

  render () {
    const { status } = this.state;
    const button = this.button();
    if (!this.props.song) {
      return null;
    }
    return(
      <section className="music-player">
        <button className="player-button" id="player-prev-button"></button>
        <button className="player-button" id={`player-${button}-button`} onClick={this.handleClick(button)}><span className="playback-button-txt">{button}</span></button>
        <button className="player-button" id="player-next-button"></button>
      </section>
    );
  }
}


export default Player;
