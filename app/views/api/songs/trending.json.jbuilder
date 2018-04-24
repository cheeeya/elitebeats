@songs.each do |song|
  json.set! song.id do
    json.extract! song, :id, :title, :author_id, :permalink
    json.author_name song.author.display_name
    json.author_url song.author.profile_url
    if song.aws_url
      json.song_url song.aws_url
    else
      json.song_url asset_path(song.songfile.url)
    end
    if song.seed_image_url
      json.image_url song.seed_image_url
    else
      json.image_url asset_path(song.image.url)
    end
  end
  json.title "trendingSongs"
end
