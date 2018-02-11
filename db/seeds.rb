# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
    email: 'demo@elitebeats.io',
    password: 'demopassword',
    age: 99,
    profile_url: "demo",
    display_name: 'Demo',
    s_prof_pic_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518360368/panda_vxtxyc.jpg"
  })
User.create({ email: 'test@elitebeats.io', password: 'testpassword', age: 20, profile_url: "test", display_name: "Test" })
User.create({
    email: 'beauz@elitebeats.io',
    password: 'beauz123',
    age: 22,
    profile_url: "beauz",
    display_name: "BEAUZ",
    s_prof_pic_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518358547/beauz_hvu1iu.jpg",
    s_cover_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518359476/beauz_cover_ttoquw.jpg"
  })
Song.create({
    title: 'Dee Yan-Key - The Pianist',
    description: 'this is a demo',
    author_id: 1,
    genre: 'classical',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/1/original/Dee_Yan-Key_-_The_Pianist.mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518364314/standard_piano_enhlkd.png",
    permalink: 'dee-yan-key-the-pianist'
  })
Song.create({
    title: "Alan Walker - Faded (BEAUZ Dreamix)",
    description: "Enjoy!",
    author_id: 3,
    genre: 'edm',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/2/original/Alan_Walker_-_Faded_(BEAUZ_Dreamix).mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518358796/beauz-faded_m1wovz.jpg",
    permalink: "alan-walker-faded-beauz-dreamix"
  })
Song.create({
    title: "Dazie Mae - The Goodbye Song",
    description: "THE Goodbye Song",
    author_id: 1,
    genre: 'jazz',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/3/original/Dazie_Mae_-_The_Goodbye_Song.mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518361068/dazie-mae_br6onm.jpg",
    permalink: "dazie-mae-the-goodbye-song"
  })
Song.create({
    title: "Charlie Puth - We Don't Talk Anymore (BEAUZ Dreamix)",
    description: "BEAUZ Dreamix",
    author_id: 3,
    genre: 'edm',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/4/original/Charlie_Puth_-_We_Don't_Talk_Anymore_(BEAUZ_Dreamix).mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518358817/we-dont-talkanymore_pvrod0.jpg",
    permalink: "charlie-puth-we-dont-talk-anymore-beauz-dreamix"
  })
Song.create({
    title: "ARMNHMR - Farewell (BEAUZ Dreamix)",
    description: "farewell!",
    author_id: 3,
    genre: 'edm',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/5/original/ARMNHMR_-_Farewell_(BEAUZ_Remix).mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518358917/armnhmr-farewell_-beauz_dlj4bq.jpg",
    permalink: "armnhmr-farewell-beauz-dreamix"
  })
Song.create({
    title: "sugiwa - je t'aime",
    description: "an old romance",
    author_id: 1,
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/6/original/sugi.wa_-_o_je_t'aime.mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518362214/jetaime_piind4.jpg",
    permalink: "sugiwa-je-taime"
  })
Song.create({
    title: "Steve Void & BEAUZ - Hide And Seek (ft. Carly Paige)",
    description: "hide and seek",
    author_id: 3,
    genre: 'edm',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/7/original/Steve_Void___BEAUZ_-_Hide_And_Seek_(ft._Carly_Paige).mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518363843/hide_and_seek_wkfmbp.jpg",
    permalink: "hide-and-seek"
  })
Song.create({
    title: "Piano Creations - 1",
    description: "a short piano piece",
    author_id: 1,
    genre: 'classical',
    aws_url: "https://s3-us-west-1.amazonaws.com/elitebeats-dev/songs/songfiles/8/original/piano_piece_1.mp3",
    seed_image_url: "http://res.cloudinary.com/elitebeats/image/upload/v1518358772/piano_oz9wsd.jpg",
    permalink: "piano-piece-1"
  })
