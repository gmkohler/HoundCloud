# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
DEFAULT_USER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"

DEFAULT_SONG_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif"
User.create([{email: "snoopy@example.com",
                image_url: DEFAULT_USER_IMAGE_URL,
                username:"snoop_dogg",
                password: "snoopy"},
             {email: "human@example.com",
                username:"human",
                image_url: DEFAULT_USER_IMAGE_URL,
                password: "humanhuman"},
             {email: "scooby@example.com",
                username:"scooby_doo",
                image_url: DEFAULT_USER_IMAGE_URL,
                password: "scooby"}
            ])
Song.create([{title: "Atomic Dog",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944506/George_Clinton_-_Atomic_Dog_gziqae.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 1},
             {title: "Who am I (What's my Name?)",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944473/snoop_doggy_dogg_-_who_am_I_what_s_my_name-_muxnxt.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 1},
             {title: "Hounds of Love",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944249/Kate_Bush_-_Hounds_of_Love_wdgudh.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 2},
             {title: "Ain't nothin but a hound dog",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944678/Elvis_Presley_-_Hound_Dog_kd8ety.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 2},
             {title: "who let the dogs out",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944599/Baha_Men_-_Who_Let_The_Dogs_Out_Original_version_-_Full_HD_-_1080p_zagtgq.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 2},
             {title: "scooby scooby doo (where are you?)",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944735/Scooby_Doo_Theme_Song_jg9u8a.mp3',
                image_url: DEFAULT_SONG_IMAGE_URL,
                artist_id: 3}
            ])
