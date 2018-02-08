import React from 'react';
import { Howl, Howler } from 'howler';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      disabled: false
    }
    this.button = this.button.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.song) {
      if (!this.props.song || this.props.song.id != nextProps.song.id) {
        if (this.songHowl) {
          this.songHowl.unload();
        }
        this.songHowl =  new Howl({
          src: [nextProps.song.song_url],
          preload: true
        });
        if (!this.state.disabled && nextProps.song.index === Object.keys(this.props.currentPlaylist).length - 1) {
          this.setState({ disabled: true });
        } else if (this.state.disabled && nextProps.song.index !== Object.keys(this.props.currentPlaylist).length - 1 ){
          this.setState({ disabled: false });
        }
      }
      this.playbackControl(nextProps.song.status);
    }
  }

  handlePlayback(action) {
    return (e) => {
      e.preventDefault();
      this.playbackControl(action);
      this.props[action](this.props.song);
    }
  }

  handleNext(nextIdx) {
    return (e) => {
      e.preventDefault();
      this.songHowl.stop();
      this.props.next(this.props.currentPlaylist, nextIdx);
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
    const { status, disabled } = this.state;
    const { song } = this.props;
    const button = this.button();
    if (!song) {
      return null;
    }

    let disabledNext = "";
    if (disabled) {
      disabledNext = "disabled-button";
    }

    return(
      <section className="music-player">
        <button className="player-button" id="player-prev-button" onClick={this.handleNext(song.index - 1)}></button>
        <button className="player-button" id={`player-${button}-button`} onClick={this.handlePlayback(button)}><span className="playback-button-txt">{button}</span></button>
        <button className={`player-button ${disabledNext}`} id="player-next-button" onClick={this.handleNext(song.index + 1)} disabled={disabled}></button>
      </section>
    );
  }
}


export default Player;
