json.extract! song, :id, :title, :description, :permalink, :author_id, :created_at, :genre
if (song.author.s_prof_pic_url)
  json.author_picture_url song.author.s_prof_pic_url
else
  json.author_picture_url song.author.profile_picture.url
end
json.author_name song.author.display_name
json.author_sounds song.author.songs.length
json.author_followers song.author.followers.length
if song.seed_image_url
  json.image_url song.seed_image_url
else
  json.image_url asset_path(song.image.url)
end
json.author_url song.author.profile_url
if song.aws_url
  json.song_url song.aws_url
else
  json.song_url asset_path(song.songfile.url)
end
json.comments do
  song.comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
