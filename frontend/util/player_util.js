

export const getSongFromPlaylist = (state, playlist, songIndex) => {
  let playlists = Object.keys(state.entities.playlists);
  if (playlists.includes(playlist)) {
    let songArray = Object.values(state.entities.playlists[playlist]);
    if (songArray[songIndex]) {
      return songArray[songIndex];
    } else {
      if (songIndex < 0) {
        return songArray[0];
      } else if (songIndex >= songArray.length) {
        return songArray[songArray.length - 1];
      }
    }
  }
  return null;
}
