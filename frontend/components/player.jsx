import React from 'react';
import { Howl, Howler } from 'howler';
import { Link } from 'react-router-dom';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "play",
      disabled: false,
      time: 0,
      muted: false,
      currentIndex: -1
    }
    this.playbackButton = this.playbackButton.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.playbackControl = this.playbackControl.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.volumeButton = this.volumeButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let clicked = false;
    if (nextProps.song) {
      if (!this.songHowl || this.props.song.id != nextProps.song.id || this.props.currentPlaylistTitle != nextProps.currentPlaylistTitle) {
        if (this.songHowl) {
          this.songHowl.unload();
          clearInterval(this.interval);
          this.setState({ time: 0 });
        }
        this.songHowl =  new Howl({
          src: [nextProps.song.song_url],
          onend: () => this.props.next(this.props.currentPlaylist, this.state.currentIndex + 1)
        });
        window.songHowl = this.songHowl;
        let cPlaylist = Object.keys(nextProps.currentPlaylist).reverse();
        let currentIndex = cPlaylist.indexOf(nextProps.song.id.toString());
        this.setState({ currentIndex });
        if (this.state.muted) {
          this.songHowl.mute(true);
        }
        if (!this.state.disabled && currentIndex + 1 >= cPlaylist.length) {
          this.setState({ disabled: true });
        } else if (this.state.disabled && currentIndex + 1 !== cPlaylist.length){
          this.setState({ disabled: false });
        }
      }
      if (this.props.song && this.state.status === nextProps.song.status && this.props.song.id === nextProps.song.id) {
        return;
      }
      this.playbackControl(nextProps.song.status);
    }
  }

  handlePlayback(action) {
    return (e) => {
      e.preventDefault();
      this.props[action](this.props.song);
    }
  }

  handleNext(nextIdx) {
    return (e) => {
      e.preventDefault();
      this.songHowl.stop();
      clearInterval(this.interval);
      if (nextIdx === -1 ) {
        this.playbackControl('play');
      } else {
        this.props.next(this.props.currentPlaylist, nextIdx);
      }
    }
  }

  handleMute(e) {
    e.preventDefault();
    if (this.state.muted) {
      this.songHowl.mute(false);
    } else {
      this.songHowl.mute(true);
    }
    this.setState({ muted: !this.state.muted });
  }

  playbackControl(action) {
    if (action === 'play') {
      this.setState({ status: action });
      this.songHowl.play();
      this.interval = setInterval(() => this.updateTime(), 100);
    } else if (action === 'pause'){
      this.setState({ status: action });
      this.songHowl.pause();
      clearInterval(this.interval);
    }
  }

  updateTime() {
    if (this.songHowl) {
      let time = this.songHowl.seek();
      if (typeof time === 'number'){
        this.setState({ time });
      }
    }
  }

  playbackButton() {
    if (this.state.status === 'play') {
      return 'pause';
    } else {
      return 'play';
    }
  }

  volumeButton() {
    if (this.state.muted) {
      return "muted";
    } else {
      return "volume";
    }
  }

  formatTime(time) {
    let timeString = "";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      timeString = min + ":0" + sec;
    } else {
      timeString = min + ":" + sec;
    }
    return timeString;
  }

  render () {
    const { status, disabled, time, currentIndex } = this.state;
    const { song } = this.props;
    const playbackButton = this.playbackButton();
    const volumeButton = this.volumeButton();

    if (!song || !this.songHowl) {
      return null;
    }
    let disabledNext = "";
    if (disabled) {
      disabledNext = "disabled-button";
    }
    let progressWidth = 0;
    if (this.songHowl.duration() > 0 ) {
      progressWidth = (500 / this.songHowl.duration()) * time;
    }
    let elapsedTimeStyle = {
      width: progressWidth + 'px'
    }
    let progressBallStyle = {
      marginLeft: (progressWidth - 4) + 'px'
    }
    let author_url = "";
    let permalink = "";
    if (song) {
      author_url = `/${song.author_url}`;
      permalink = `${author_url}/${song.permalink}`;
    }
    return(
      <section className="music-player">
        <button className="player-button" id="player-prev-button" onClick={this.handleNext(currentIndex - 1)}></button>
        <button className="player-button" id={`player-${playbackButton}-button`} onClick={this.handlePlayback(playbackButton)}><span className="playback-button-txt">{playbackButton}</span></button>
        <button className={`player-button ${disabledNext}`} id="player-next-button" onClick={this.handleNext(currentIndex + 1)} disabled={disabled}></button>
        <div className="progress-bar-div">
          <div className="progress-bar-time-current">
            <span>{this.formatTime(this.state.time)}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-total">
              <div className="progress-bar-elapsed-time" style={elapsedTimeStyle}>
                <div className="progress-ball" style={progressBallStyle}/>
              </div>
            </div>
          </div>
          <div className="progress-bar-time-total">
            <span>{this.formatTime(this.songHowl.duration())}</span>
          </div>
        </div>
        <button className="player-button" id={`player-${volumeButton}-button`} onClick={this.handleMute}></button>
        <div className="volume-control-div">

        </div>
        <div className="player-song-info">
          <Link to={permalink}><div className="player-song-artwork" style={{ backgroundImage: `url(${song.image_url})` }} /></Link>
          <ul>
            <li><Link to={author_url}><span className="player-song-author">{song.author_name}</span></Link></li>
            <li><Link to={permalink}><span className="player-song-title">{song.title}</span></Link></li>
          </ul>
        </div>
      </section>
    );
  }
}


export default Player;
