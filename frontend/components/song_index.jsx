import React from 'react';
import { Link } from 'react-router-dom';
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
        <ul className="songs-index-list">
          {
            songs.map(song => {
              let postDate = song.created_at.slice(0,10).split("-");
              postDate.push(postDate.shift());
              postDate = postDate.join("-");
              return (
                <li className="song-index-list-item" key={song.id}>
                  <div className="song-list-user-div">
                    <Link to={song.author_url}><img className="song-list-user-img" src={song.author_picture_url} /></Link>
                    <span className="song-list-user-span">
                      <Link to={song.author_url}>{song.author_name}</Link><span className="song-list-user-span-inner">posted a track on {postDate}</span>
                    </span>
                  </div>
                  <SongItemContainer song={song} path="stream" playlist="allSongs" />
                </li>
              );
            })
          }
        </ul>
      </section>
    );
  }
}

export default SongIndex;
