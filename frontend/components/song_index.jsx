import React from 'react';
import SongIndexItem from './song_index_item';
import SongPageContainer from './song_page_container';

class SongIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render () {
    const { songs, currentSong } = this.props;
    return (
      <section className="songs-index">
        <ul className="songs-list">
          {
            songs.map(song => {
              let status = 'pause';
              if (currentSong && song.id === currentSong.id) {
                status = currentSong.status;
              }
              return <SongIndexItem song={song} play={this.props.play} pause={this.props.pause} status={status} key={song.id} />
            })
          }
        </ul>
      </section>
    );
  }
}

export default SongIndex;
