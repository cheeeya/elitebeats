
@songs.each do |song|
  json.set! song.id do
    json.partial! 'api/songs/song', song: song
  end
  json.title "allSongs"
end
