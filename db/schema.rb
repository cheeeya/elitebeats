# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180424071117) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.integer "author_id", null: false
    t.integer "song_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "follows", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "follower_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["follower_id", "user_id"], name: "index_follows_on_follower_id_and_user_id", unique: true
    t.index ["user_id", "follower_id"], name: "index_follows_on_user_id_and_follower_id", unique: true
  end

  create_table "songs", force: :cascade do |t|
    t.string "title", null: false
    t.string "genre", default: "none"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.integer "author_id", null: false
    t.string "songfile_file_name"
    t.string "songfile_content_type"
    t.integer "songfile_file_size"
    t.datetime "songfile_updated_at"
    t.string "aws_url"
    t.string "permalink", null: false
    t.string "seed_image_url"
    t.integer "total_plays", default: 0
    t.index ["author_id", "permalink"], name: "index_songs_on_author_id_and_permalink", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_url", null: false
    t.integer "age", null: false
    t.string "display_name", null: false
    t.string "profile_picture_file_name"
    t.string "profile_picture_content_type"
    t.integer "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
    t.string "cover_file_name"
    t.string "cover_content_type"
    t.integer "cover_file_size"
    t.datetime "cover_updated_at"
    t.string "s_prof_pic_url"
    t.string "s_cover_url"
    t.string "first_name"
    t.string "last_name"
    t.string "city"
    t.string "country"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["profile_url"], name: "index_users_on_profile_url", unique: true
  end

end
