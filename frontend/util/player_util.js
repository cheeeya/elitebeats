

// export const getSongFromPlaylist = (state, playlist, songIndex) => {
//   let playlists = Object.keys(state.entities.playlists);
//   if (playlists.includes(playlist)) {
//     let songArray = Object.values(state.entities.playlists[playlist]);
//     if (songArray[songIndex]) {
//       return songArray[songIndex];
//     } else {
//       if (songIndex < 0) {
//         return songArray[0];
//       }
//     }
//   }
//   return null;
// }


export const getSongFromPlaylist = (playlist, songIndex) => {
  let songArray = Object.keys(playlist).map(el => playlist[el]).reverse();
  if (songArray[songIndex]) {
    return songArray[songIndex];
  } else {
    if (songIndex < 0) {
      return songArray[0];
    }
  }
  return null;
}
