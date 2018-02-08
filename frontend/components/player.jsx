import React from 'react';
import { Howl, Howler } from 'howler';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStatus: 'play'
    }
    this.songHowl = new Howl({
      src: [this.props.song.song_url]
    });
  }

  render () {

    return(
      <section className="music-player">

      </section>
    );
  }
}


export default Player;
