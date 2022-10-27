# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  User.create!(
    first_name: 'Demo',
    last_name: 'Demoington',
    email: 'demo@user.io',
    birthdate: "2000-01-01",
    password: 'password',
    bio: 'test 123'
  )

  User.create!(
    first_name: 'Mitchell',
    last_name: 'Jindra',
    email: 'jindra.mitch@gmail.com',
    birthdate: '1998-04-13',
    password: 'password',
    bio: 'test test'
  )

  puts "Done!"
end