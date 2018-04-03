@users.each do |user|
  json.set! user.id do
    json.extract! user, :profile_url, :display_name
    if user.s_prof_pic_url
      json.profile_picture_url user.s_prof_pic_url
    else
      json.profile_picture_url user.profile_picture.url
    end
  end
end