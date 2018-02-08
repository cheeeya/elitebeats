json.extract! @user, :id, :display_name, :profile_url, :info
json.profile_picture_url @user.profile_picture.url
json.cover_url @user.cover.url
json.tracks do
  @user.songs.each_with_index do |song, idx|
    json.set! idx do
      json.partial! 'api/songs/song', song: song
      json.index idx
    end
  end
end
