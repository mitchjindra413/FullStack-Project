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
  Listing.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')

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

  Listing.create!(
  owner_id: 2,
  street_address: '1515 Webster St',
  apt: 'Apt 421',
  city: 'Oakland',
  zip_code: '94612',
  state: 'California',
  country: 'United States of America',
  lat: 37.804720,
  long: -122.268390,
  tags: 'Mitch OMG',
  property_type: 'Apartment',
  max_guests: 3,
  night_price: 70,
  cleaning_fee: 10,
  description: 'Lovely studio in the heart of downtown Oakland. Close to bart station making it easy to get anywhere in the Bay.',
  num_bedrooms: 0,
  num_beds: 1,
  num_baths: 1,
  amenities: 'Wifi Kitchen Washer',
  tag_line: 'Heart of Oakland'
  )

  puts "Done!"
end