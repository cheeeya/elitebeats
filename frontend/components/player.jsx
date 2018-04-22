import React from 'react';
import { Howl, Howler } from 'howler';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "play",
      disabled: false,
      time: 0,
      muted: false,
      currentIndex: -1,
      expandedVolume: false,
      volume: 1,
      controlledVolumePosition: {
        x: 0,
        y: 0
      },
      isMouseDown: false,
      tempDisplay: ""
    }
    this.checkState = this.checkState.bind(this);
    this.dragVolume = this.dragVolume.bind(this);
    this.expandVolumeControl = this.expandVolumeControl.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.playbackButton = this.playbackButton.bind(this);
    this.playbackControl = this.playbackControl.bind(this);
    this.reduceVolumeControl = this.reduceVolumeControl.bind(this);
    this.releaseMouse = this.releaseMouse.bind(this);
    this.releaseMouseOutside = this.releaseMouseOutside.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setPositionFromBox = this.setPositionFromBox.bind(this);
    this.snapToClick = this.snapToClick.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.volumeButton = this.volumeButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let clicked = false;
    const { volume, muted } = this.state;
    if (nextProps.song) {
      if (!this.songHowl || this.props.song.id != nextProps.song.id || this.props.currentPlaylistTitle != nextProps.currentPlaylistTitle) {
        if (this.songHowl) {
          this.songHowl.unload();
          clearInterval(this.interval);
          this.setState({ time: 0 });
        }
        this.songHowl =  new Howl({
          src: [nextProps.song.song_url],
          volume: volume,
          mute: muted,
          onload: () => this.checkState(),
          onend: () => this.props.next(this.props.currentPlaylist, this.state.currentIndex + 1)
        });
        window.songHowl = this.songHowl;
        let cPlaylist = Object.keys(nextProps.currentPlaylist).reverse();
        let currentIndex = cPlaylist.indexOf(nextProps.song.id.toString());
        this.setState({ currentIndex });
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

  checkState() {
    const { muted, status, volume } = this.state;
    this.songHowl.mute(muted);
    this.songHowl.volume(volume);
    if (status === "pause") {
      this.songHowl.pause();
    }
  }

  dragVolume(e) {
    e.preventDefault();
    if (this.state.isMouseDown) {
      this.setPositionFromBox(e);
    }
  }

  expandVolumeControl(e) {
    e.preventDefault();
    this.setState({ expandedVolume: "expanded-volume" });
  }

  reduceVolumeControl(e) {
    e.preventDefault();
    this.setState({ expandedVolume: "" });
  }

  snapToClick(e, position) {
    e.preventDefault();
    document.getElementById("root").addEventListener('mouseup', this.releaseMouseOutside);
    document.getElementById("root").addEventListener('mousemove', this.dragVolume);
    this.setState({ isMouseDown: true });
    this.setPositionFromBox(e);
  }

  setPosition(e, position) {
    const { y } = position;
    this.setState({ controlledVolumePosition: { x: 0, y } });
  }

  setPositionFromBox (e) {
    let bounds = document.getElementById("volume-box").getBoundingClientRect();
    let newY = e.clientY - bounds.top - 20, volume;
    if (newY < 0) {
      newY = 0;
    }
    else if (newY > 92) {
      newY = 92;
    }
    volume = (92 - newY)/92;
    this.songHowl.volume(volume);
    this.setState({ controlledVolumePosition: { x: 0, y: newY }, volume });
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
    const { controlledVolumePosition } = this.state;
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

  eventLogger (e, position) {
    console.log("log");
    console.log(e.target);
  }

  volumeButton() {
    const { muted, volume } = this.state;
    if (muted || volume === 0) {
      return "muted";
    } else if (volume <= 0.5) {
      return "low-volume";
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

  releaseMouse (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("root").removeEventListener("mouseup", this.releaseMouseOutside);
    document.getElementById("root").removeEventListener("mousemove", this.dragVolume);
    this.setState({ isMouseDown: false });
  }

  releaseMouseOutside (e) {
    e.preventDefault();
    if (!e.target.classList.value.includes("volume")) {
      document.getElementById("root").removeEventListener("mouseup", this.releaseMouseOutside);
      document.getElementById("root").removeEventListener("mousemove", this.dragVolume);
      this.setState({ isMouseDown: false, tempDisplay: "expanded-volume" });
      window.setTimeout(() => this.setState({ tempDisplay: ""}), 700);
    }
  }

  render () {
    const { status, disabled, time, currentIndex, expandedVolume,
      controlledVolumePosition, isMouseDown, tempDisplay } = this.state;
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
        <button className="player-button" id="player-prev-button"
          onClick={this.handleNext(currentIndex - 1)} />
        <button className="player-button" id={`player-${playbackButton}-button`}
          onClick={this.handlePlayback(playbackButton)}>
          <span className="playback-button-txt">
            {playbackButton}
          </span>
        </button>
        <button className={`player-button ${disabledNext}`} id="player-next-button"
          onClick={this.handleNext(currentIndex + 1)} disabled={disabled} />
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
        <div className="volume-control-div" onMouseOver={this.expandVolumeControl}
          onMouseOut={this.reduceVolumeControl}>
          <div id="volume-box" className={`volume-slider-box ${expandedVolume || isMouseDown ? "expanded-volume" : ""} ${tempDisplay}`}
            onMouseDown={this.snapToClick} onMouseMove={this.dragVolume}
            onMouseUp={this.releaseMouse}>
            <div className={`volume-slider ${expandedVolume}`}>
              <Draggable
                axis="y"
                defaultPosition={{x:0, y:0}}
                position={controlledVolumePosition}
                bounds={{top: 0, bottom: 92 }}
                onDrag={this.setPosition}>
                  <div className="volume-ball" />
              </Draggable>
              <div className="volume-fill" style={{ height: 100 - controlledVolumePosition.y }} />
            </div>
          </div>
          <div className={`volume-slider-box-pointer-outline ${expandedVolume || isMouseDown ? "expanded-volume" : ""} ${tempDisplay}`}/>
          <div className={`volume-slider-box-pointer-fill ${expandedVolume || isMouseDown ? "expanded-volume" : ""} ${tempDisplay}`} />
          <button className="player-button volume-button" id={`player-${volumeButton}-button`}
            onClick={this.handleMute} />
        </div>
        <div className="player-song-info">
          <Link to={permalink}>
            <div className="player-song-artwork"
              style={{ backgroundImage: `url(${song.image_url})` }} />
          </Link>
          <ul>
            <li>
              <Link to={author_url}>
                <span className="player-song-author">{song.author_name}</span>
              </Link>
            </li>
            <li>
              <Link to={permalink}>
                <span className="player-song-title">{song.title}</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}


export default Player;
