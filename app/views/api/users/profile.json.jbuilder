json.extract! @user, :id, :display_name, :profile_url, :info
json.profile_picture_url @user.profile_picture.url
json.cover_url @user.cover.url
json.tracks do
  json.title @user.display_name
  @user.songs do |song|
    json.set! song.id do
      json.partial! 'api/songs/song', song: song
    end
  end
end
