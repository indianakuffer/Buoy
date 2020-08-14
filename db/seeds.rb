# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
ProfilePic.destroy_all
Tag.destroy_all
Thought.destroy_all

default_pic = {image: 'https://i.imgur.com/COEcTuk.png'}
profile_pics = [
  {image: 'https://i.imgur.com/7FyTTJ8.png'},
  {image: 'https://i.imgur.com/vtnDW3W.png'},
  {image: 'https://i.imgur.com/ljH4o1X.png'},
  {image: 'https://i.imgur.com/MWjzQLn.png'},
  {image: 'https://i.imgur.com/aox4BVv.png'}
]
@default_pic = ProfilePic.create(default_pic)
ProfilePic.create(profile_pics)

admin = {
    username: 'admin',
    email: 'admin@email.com',
    password: '234567',
    profile_pic: @default_pic
}
@admin = User.create(admin)

tags = [
  {name: 'first-post'},
  {name: 'second-post'}
]
Tag.create(tags)

thoughts = [
  {content: "Hello, world!", user: @admin, color: "f0c419"},
  {content: "Hello again, world!", user: @admin, color: "fbffe2"}
]
Thought.create(thoughts)

puts "#{User.count} Users created!"
puts "#{ProfilePic.count} ProfilePics created!"
puts "#{Tag.count} Tags created!"
puts "#{Thought.count} Thoughts created!"