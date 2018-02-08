export const NEXT_SONG = 'NEXT_SONG';
export const PLAY_SONG = 'PLAY_SONG';
export const PREV_SONG = 'PREV_SONG';


const playSong = song => ({
  type: PLAY_SONG,
  song
});

const nextSong = song => ({
  type: NEXT_SONG,
  song
})

const prevSong = song => ({
  type: PREV_SONG,
  song
})
