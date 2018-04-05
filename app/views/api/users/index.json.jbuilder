@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :profile_url, :display_name
    if user.s_prof_pic_url
      json.profile_picture_url user.s_prof_pic_url
    else
      json.profile_picture_url user.profile_picture.url
    end
    json.user_sounds user.songs.length
    json.user_followers user.followers.length
  end
end
