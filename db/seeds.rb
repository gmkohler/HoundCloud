# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
DEFAULT_USER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"
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
Song.create([{title: "doggystyle",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 1},
             {title: "what's my name",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 1},
             {title: "Hounds of Love",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 2},
             {title: "Ain't nothin but a hound dog",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 2},
             {title: "who let the dogs out",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 2},
             {title: "scooby scooby doo (where are you?)",
                content_url: 'www.example.com',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
                artist_id: 3}
            ])
