json.extract! user, :id, :email, :profile_url, :display_name
if user.s_prof_pic_url
  json.profile_picture_url user.s_prof_pic_url
else
  json.profile_picture_url user.profile_picture.url
end
if user.s_cover_url
  json.cover_url user.s_cover_url
else
  json.cover_url user.cover.url
end
json.user_followers do
  json.array! user.followers.map { |f| f.id }
end
json.user_followings do
  json.array! user.followings.map { |f| f.id }
end
