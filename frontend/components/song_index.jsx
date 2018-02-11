import React from 'react';
import SongItemContainer from './song_item_container';
import SongPageContainer from './song_page_container';

class SongIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render () {
    const { songs, currentSong, pause, play, currentUser } = this.props;
    return (
      <section className="songs-index">
        <ul className="songs-list">
          {
            songs.map(song => {
              return <SongItemContainer song={song} key={song.id} path="stream" playlist="allSongs" />
            })
          }
        </ul>
      </section>
    );
  }
}

export default SongIndex;
