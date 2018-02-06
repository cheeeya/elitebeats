# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({ email: 'demo@elitebeats.io', password: 'demopassword', age: 99, profile_url: "demo", display_name: 'Demo' })
User.create({ email: 'test@elitebeats.io', password: 'testpassword', age: 20, profile_url: "test", display_name: "Test" })
User.create({ email: 'beauz@elitebeats.io', password: 'beauz123', age: 22, profile_url: "beauz", display_name: "BEAUZ" })
Song.create({
  title: 'Dee Yan-Key - The Pianist',
  description: 'this is also a demo',
  author_id: 1,
  aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/000/000/002/original/Dee_Yan-Key_-_11_-_The_Pianist.mp3",
  permalink: 'dee-yan-key-the-pianist'
})
Song.create({
  title: "Alan Walker - Faded (BEAUZ Dreamix)",
  description: "Enjoy!",
  author_id: 3,
  aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/000/000/004/original/Alan_Walker_-_Faded_(BEAUZ_Dreamix).mp3",
  permalink: "alan-walker-faded-beauz-dreamix"
})
