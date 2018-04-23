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
      controlledProgressPosition: {
        x: 0,
        y: 0
      },
      controlledVolumePosition: {
        x: 0,
        y: 0
      },
      isMouseDownP: false,
      isMouseDownV: false,
      tempDisplay: "",
      repeat: false
    }
    this.checkState = this.checkState.bind(this);
    this.dragProgress = this.dragProgress.bind(this);
    this.dragVolume = this.dragVolume.bind(this);
    this.expandVolumeControl = this.expandVolumeControl.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleRepeat = this.handleRepeat.bind(this);
    this.playbackButton = this.playbackButton.bind(this);
    this.playbackControl = this.playbackControl.bind(this);
    this.reduceVolumeControl = this.reduceVolumeControl.bind(this);
    this.releaseMouseProg = this.releaseMouseProg.bind(this);
    this.releaseMouseVol = this.releaseMouseVol.bind(this);
    this.releaseMouseOutsideVol = this.releaseMouseOutsideVol.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setPositionFromBar = this.setPositionFromBar.bind(this);
    this.setPositionFromBox = this.setPositionFromBox.bind(this);
    this.snapProgressToClick = this.snapProgressToClick.bind(this);
    this.snapVolToClick = this.snapVolToClick.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.volumeButton = this.volumeButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let clicked = false;
    const { status, volume, muted, repeat, disabled, currentIndex } = this.state;
    const { song, currentPlaylistTitle, next, currentPlaylist } = this.props;
    if (nextProps.song) {
      if (!this.songHowl || song.id != nextProps.song.id || currentPlaylistTitle != nextProps.currentPlaylistTitle) {
        if (this.songHowl) {
          this.songHowl.unload();
          clearInterval(this.interval);
          this.setState({ time: 0 });
        }
        this.songHowl =  new Howl({
          src: [nextProps.song.song_url],
          volume: volume,
          mute: muted,
          loop: repeat,
          onload: () => this.checkState(),
          onend: () => this.checkRepeat()
        });
        window.songHowl = this.songHowl;
        let cPlaylist = Object.keys(nextProps.currentPlaylist).reverse();
        let currentIndex = cPlaylist.indexOf(nextProps.song.id.toString());
        this.setState({ currentIndex });
        if (!disabled && currentIndex + 1 >= cPlaylist.length) {
          this.setState({ disabled: true });
        } else if (disabled && currentIndex + 1 !== cPlaylist.length){
          this.setState({ disabled: false });
        }
      }
      if (song && status === nextProps.song.status && song.id === nextProps.song.id) {
        return;
      }
      this.playbackControl(nextProps.song.status);
    }
  }

  checkState() {
    const { muted, status, volume, repeat } = this.state;
    this.songHowl.mute(muted);
    this.songHowl.volume(volume);
    this.songHowl.loop(repeat);
    if (status === "pause") {
      this.songHowl.pause();
    }
  }

  checkRepeat() {
    const { repeat, currentIndex } = this.state;
    const { currentPlaylist, next } = this.props;
    if (!repeat) {
      next(currentPlaylist, currentIndex + 1);
    }
  }

  dragProgress (e, position) {
    e.preventDefault();
    if (this.state.isMouseDownP) {
      this.setPositionFromBar(e);
      this.updateTime();
    }
  }

  dragVolume(e) {
    e.preventDefault();
    if (this.state.isMouseDownV) {
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

  snapProgressToClick (e) {
    e.preventDefault();
    document.getElementById("root").addEventListener("mouseup", this.releaseMouseProg);
    document.getElementById("root").addEventListener("mousemove", this.dragProgress);
    this.setState({ isMouseDownP: true });
    this.setPositionFromBar(e);
    this.updateTime();
  }

  snapVolToClick(e, position) {
    e.preventDefault();
    document.getElementById("root").addEventListener('mouseup', this.releaseMouseOutsideVol);
    document.getElementById("root").addEventListener('mousemove', this.dragVolume);
    this.setState({ isMouseDownV: true });
    this.setPositionFromBox(e);
  }

  setPosition(e, position) {
    const { y } = position;
    this.setState({ controlledVolumePosition: { x: 0, y } });
  }

  setPositionFromBar (e) {
    let bounds = document.getElementById("progress-bar").getBoundingClientRect();
    let x = e.clientX - bounds.left, progress;
    if (x < 0) {
      x = 0;
    } else if (x > 500) {
      x = 500;
    }
    this.setState({ controlledProgressPosition: { x, y: 0}});
  }

  setPositionFromBox (e) {
    let bounds = document.getElementById("volume-box").getBoundingClientRect();
    let newY = e.clientY - bounds.top - 15, volume;
    if (newY < 0) {
      newY = 0;
    }
    else if (newY > 100) {
      newY = 100;
    }
    volume = (100 - newY)/100;
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
    this.songHowl.mute(!this.state.muted);
    this.setState({ muted: !this.state.muted });
  }

  handleRepeat(e) {
    e.preventDefault();
    this.songHowl.loop(!this.state.repeat);
    this.setState({ repeat: !this.state.repeat });
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
      let time = 0;
      if (this.state.isMouseDownP) {
        let duration = this.songHowl.duration();
        if (duration === 0) {
          time = 0;
        } else {
          time = this.state.controlledProgressPosition.x / (500/duration);
        }
      } else {
        time = this.songHowl.seek();
      }
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

  releaseMouseProg (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("root").removeEventListener("mouseup", this.releaseMouseProg);
    document.getElementById("root").removeEventListener("mousemove", this.dragProgress);
    this.updateTime();
    this.songHowl.seek(this.state.controlledProgressPosition.x / (500/this.songHowl.duration()));
    this.setState({ isMouseDownP: false });
  }

  releaseMouseVol (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("root").removeEventListener("mouseup", this.releaseMouseOutsideVol);
    document.getElementById("root").removeEventListener("mousemove", this.dragVolume);
    this.setState({ isMouseDownV: false });
  }

  releaseMouseOutsideVol (e) {
    e.preventDefault();
    if (!e.target.classList.value.includes("volume")) {
      document.getElementById("root").removeEventListener("mouseup", this.releaseMouseOutsideVol);
      document.getElementById("root").removeEventListener("mousemove", this.dragVolume);
      this.setState({ isMouseDownV: false, tempDisplay: "expanded-volume" });
      window.setTimeout(() => this.setState({ tempDisplay: ""}), 700);
    }
  }

  render () {
    const { status, disabled, time, currentIndex, expandedVolume,
      controlledVolumePosition, controlledProgressPosition,
      isMouseDownV, isMouseDownP, tempDisplay, repeat } = this.state;
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
    if (this.songHowl.duration() > 0 && !isMouseDownP ) {
      controlledProgressPosition.x = (500 / this.songHowl.duration()) * time;
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
        <button className="player-button" onClick={this.handleRepeat}
          id={`player-${repeat ? "repeat-blue" : "repeat"}-button`} />
        <div className="progress-bar-div">
          <div className="progress-bar-time-current">
            <span>{this.formatTime(this.state.time)}</span>
          </div>
          <div id="progress-bar" onMouseDown={this.snapProgressToClick}
            onMouseMove={this.dragProgress} onMouseUp={this.releaseMouseProg}>
            <div className="progress-bar-total">
              <div className="progress-bar-elapsed-time" style={{ width: controlledProgressPosition.x }}>
                <Draggable
                  axis="x"
                  defaultPosition={{x: 0, y:0}}
                  position={controlledProgressPosition}
                  bounds={{left: 0, right: 500}}>
                  <div className={`progress-ball ${isMouseDownP ? "visible" : ""}`} />
                </Draggable>
              </div>
            </div>
          </div>
          <div className="progress-bar-time-total">
            <span>{this.formatTime(this.songHowl.duration())}</span>
          </div>
        </div>
        <div className="volume-control-div" onMouseOver={this.expandVolumeControl}
          onMouseOut={this.reduceVolumeControl}>
          <div id="volume-box" className={`volume-slider-box ${expandedVolume || isMouseDownV ? "expanded-volume" : ""} ${tempDisplay}`}
            onMouseDown={this.snapVolToClick} onMouseMove={this.dragVolume}
            onMouseUp={this.releaseMouseVol}>
            <div className={`volume-slider ${expandedVolume}`}>
              <Draggable
                axis="y"
                defaultPosition={{x:0, y:0}}
                position={controlledVolumePosition}
                bounds={{top: 0, bottom: 100 }}
                onDrag={this.setPosition}>
                  <div className="volume-ball" />
              </Draggable>
              <div className="volume-fill" style={{ height: 100 - controlledVolumePosition.y }} />
            </div>
          </div>
          <div className={`volume-slider-box-pointer-outline ${expandedVolume || isMouseDownV ? "expanded-volume" : ""} ${tempDisplay}`}/>
          <div className={`volume-slider-box-pointer-fill ${expandedVolume || isMouseDownV ? "expanded-volume" : ""} ${tempDisplay}`} />
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
