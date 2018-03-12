json.extract! @user, :id, :display_name, :profile_url, :info
if @user.s_prof_pic_url
  json.profile_picture_url @user.s_prof_pic_url
else
  json.profile_picture_url @user.profile_picture.url
end
if @user.s_cover_url
  json.cover_url @user.s_cover_url
else
  json.cover_url @user.cover.url
end
json.tracks do
  json.allTracks do
    json.title (@user.display_name + "AllTracks")
    @user.songs.each do |song|
      json.set! song.id do
        json.partial! 'api/songs/song', song: song
      end
    end
  end
end
