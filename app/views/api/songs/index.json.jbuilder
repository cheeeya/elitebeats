
@songs.each_with_index do |song, idx|
  json.set! idx do
    json.partial! 'api/songs/song', song: song
    json.index idx
  end
end
