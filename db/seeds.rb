# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Song.create([{title: "doggystyle",
              content_url: 'www.example.com',
              image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif",
              artist_id: 1}]
            )
