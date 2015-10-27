# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
DEFAULT_USER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"
DEFAULT_USER_COVER_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444792510/Poodle_kqgsbm.png"
DEFAULT_SONG_IMAGE_URL = "http://res.cloudinary.com/gmkohler/image/upload/v1444793208/snoopy_hw9q5n.gif"

User.create([{email: "snoopy@example.com", # id: 1
                username:"snoopy",
                location:"doghouse",
                bio: "zzzzzzzzzz",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445906796/e7af5a51ea0bcf7dd285450b5ae91337_gr5hme.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_crop,g_south,h_260,w_960,y_195/v1445907232/snoopy-wallpaper-2_ad2bzn.jpg",
                password: "snoopy"
             },
             {email: "human@example.com", # id: 2
                username: "human",
                location: "San Francisco",
                bio: "Some ruff demos of what's to come",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_crop,g_south_west,h_270/v1445897696/md04_x4zkbf.jpg",
                cover_image_url: DEFAULT_USER_COVER_IMAGE_URL,
                password: "humanhuman"
             },
             {email: "corgi@example.com", # id: 3
                username: "majestic_corgi",
                location: "Field of Dreams",
                bio: "arrrruuuuffff!! ruff ruff!!",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_crop,w_1583,x_350,y_320/v1445899622/MWBJlst_mhbw6r.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_scale,w_1708/v1445900700/1KH_3724_SE_dgcyoa.jpg",
                password: "corgicorgi"
             },
             {email: "doge@example.com", # id: 5
                username: "doge",
                location: "such unsure",
                bio: "wow. many music. much listen. so bark.",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445902267/3f5a00acf72df93528b6bb7cd0a4fd0c_stnvbe.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445902503/18361-doge-follow-your-dreams_tg4nac.jpg",
                password:"dogedoge"
             },
             {email:"bo@whitehouse.gov", # id: 7
                username:"first_pup",
                location:"1600 Pennsylvania Ave NW",
                bio:"Gonna miss this yard",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445907909/Bo_official_portrait_pplrcd.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_scale,w_1112/v1445908031/White_House_Washington_tewyo4.jpg",
                password:"boobama"
             },
             {email:"clifford@example.com", # id: 8
                username:"big_red",
                location:"Everywhere",
                bio:"arrfff ruff wooff arrff bark bark woof!",
                image_url:"http://res.cloudinary.com/gmkohler/image/upload/v1445908437/clifford_main_image_wg6sre.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/c_crop,h_260,w_960,x_222,y_2010/v1445908630/Clifford_prjhim.jpg",
                password:"cliffordclifford"
             },
             {email: "scooby@example.com", # id: 9
                username:"scooby_doo",
                location: "avoiding work",
                bio: "roooby rack?",
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445909370/scooby_doo_2_mumwfn.jpg",
                cover_image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1445909531/mysteryvan_grou1_nkumyo.jpg",
                password: "scooby"
             },
             {email: "laika@example.com", # id: 10
                username:"laika",
                location:"outer space",
                bio:"Moscow, we have a problem.",
                image_url:"http://res.cloudinary.com/gmkohler/image/upload/v1445909180/2678885-4063_o_laika_x9ojth.jpg",
                cover_image_url:"http://res.cloudinary.com/gmkohler/image/upload/v1445909229/outer-space-wallpaper-pictures_xt8rkp.jpg",
                password:"laikalaika"
              }])

Song.create([{title: "Peanuts Theme", # id: 1
                content_url: '',
                artist_id: 1
             },
             {title: "A Charlie Brown Christmas", # id: 2
                content_url: '',
                artist_id: 1
             },
             {title: "Awooo Ruff Ruff", # id: 3
                content_url: '',
                artist_id: 1
             },
             {title: "Bark Bark Bark", # id: 4
                content_url: '',
                artist_id: 1
             },
             {title: "Rrrrruf!", # id: 5
                content_url: '',
                artist_id: 1
             },
             {title: "Atomic Dog", # id: 6
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944506/George_Clinton_-_Atomic_Dog_gziqae.mp3',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444843163/images/x068uggtwzlmrlpzksbo.gif",
                artist_id: 2
             },
             {title: "Who Let the Dogs Out?", # id: 7
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944599/Baha_Men_-_Who_Let_The_Dogs_Out_Original_version_-_Full_HD_-_1080p_zagtgq.mp3',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444849636/images/yjftov1lruscbdnaydbb.jpg",
                artist_id: 2
             },
             {title: "Hounds of Love", # id: 8
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944249/Kate_Bush_-_Hounds_of_Love_wdgudh.mp3',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444848213/images/t1jlnbeekhfppsnem9wy.jpg", # GET THE COVER IMAGE
                artist_id: 2
             },
             {title: "Ain't Nothin But a Hound Dog", # id: 9
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944678/Elvis_Presley_-_Hound_Dog_kd8ety.mp3',
                image_url: "http://res.cloudinary.com/gmkohler/image/upload/v1444848614/images/vceaty0lxdvabrq7ltsq.jpg", # GET ELVIS HERE
                artist_id: 2
             },
             {title: "Rrrrruf!", # id: 10
                content_url: '',
                artist_id: 3
             },
             {title: "Awooooo!", # id: 11
                content_url: '',
                artist_id: 3
             },
             {title: "Bowwwwruuuff!", # id: 12
                content_url: '',
                artist_id: 3
             },
             {title: "Rrrrruf!", # id: 13
                content_url: '',
                artist_id: 4
             },
             {title: "Awooooo!", # id: 14
                content_url: '',
                artist_id: 4
             },
             {title: "Bowwwwruuuff!", # id: 15
                content_url: '',
                artist_id: 4
             },
             {title: "Awwwoooo!!", # id: 16
                content_url: '',
                artist_id: 5
             },
             {title: "Ruf! Ruf! Rrrrruf Ruf Ruf!!", # id: 17
                content_url: '',
                artist_id: 5
             },
             {title: "Auw Auw!! Auw Auw Auw!!", # id: 18
                content_url: '',
                artist_id: 5
             },
             {title: "Ruf Ruf Ruf! Bark Ruf Ruf!", # id: 19
                content_url: '',
                artist_id: 5
             },
             {title: "Bark! Bark!", # id: 20
                content_url: '',
                artist_id: 5
             },
             {title: "WALK???", # id: 21
                content_url: '',
                artist_id: 6
             },
             {title: "SLAM DUNK!", # id: 22
                content_url: '',
                artist_id: 6
             },
             {title: "ARF ARF", # id: 23
                content_url: '',
                artist_id: 6
             },
             {title: "RUF RUF RUF", # id: 24
                content_url: '',
                artist_id: 6
             },
             {title: "", # id: 25
                content_url: '',
                artist_id: 7
             },
             {title: "WALK???", # id: 26
                content_url: '',
                artist_id: 7
             },
             {title: "WALK???", # id: 27
                content_url: '',
                artist_id: 7
             },
             {title: "Scooby Scooby Doo (Where Are You?)",
                content_url: 'http://res.cloudinary.com/gmkohler/video/upload/v1444944735/Scooby_Doo_Theme_Song_jg9u8a.mp3',
                artist_id: 9
             }
            ])
Following.create([
  {followee_id: 2, follower_id: 7},
  {followee_id: 1, follower_id: 7},
  {followee_id: 3, follower_id: 7},
  {followee_id: 3, follower_id: 7},
])
Like.create([
  {followee_id: 2, follower_id: 7},
  {followee_id: 1, follower_id: 7},
  {followee_id: 3, follower_id: 7},
  {followee_id: 3, follower_id: 7},
])
Repost.create([
  {followee_id: 2, follower_id: 7},
  {followee_id: 1, follower_id: 7},
  {followee_id: 3, follower_id: 7},
  {followee_id: 3, follower_id: 7},
])
Comment.create([
  {followee_id: 2, follower_id: 7},
  {followee_id: 1, follower_id: 7},
  {followee_id: 3, follower_id: 7},
  {followee_id: 3, follower_id: 7},
])
#  follower_id :integer          not null}])
