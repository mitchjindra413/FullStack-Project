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

  l1 = Listing.create!(
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

  l2 = Listing.create!(
  owner_id: 1,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94103',
  state: 'California',
  country: 'United States of America',
  lat: 37.804720,
  long: -122.268390,
  tags: 'OMG',
  property_type: 'Guest suite',
  max_guests: 3,
  night_price: 198,
  cleaning_fee: 100,
  description: 'This listing is a 400 sq ft guest studio with a private street-level entrance, and full bathroom and kitchenette. We are a young couple who live upstairs with our dog.---Due to this being on the street level in the heart of the city, you will hear some street noise (check our reviews to see what customers think of this!) It has not been a problem for our guests in the past, but we provide earplugs just in case.',
  num_bedrooms: 1,
  num_beds: 1,
  num_baths: 1,
  amenities: 'Wifi Pets Workspace',
  tag_line: 'The Pottery Studio Apt - Newly Renovated in SOMA'
  )

  l3 = Listing.create!(
  owner_id: 2,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94559',
  state: 'California',
  country: 'United States of America',
  lat: 37.804720,
  long: -122.268390,
  tags: 'OMG Luxe',
  property_type: 'Apartment',
  max_guests: 2,
  night_price: 260,
  cleaning_fee: 75,
  description: 'Recently renovated Victorian in a prime NOPA location. Walking distance to the restaurants, bars, and coffee shops on Divisadero, and you can see Golden Gate Park from the front steps.',
  num_bedrooms: 1,
  num_beds: 1,
  num_baths: 1,
  amenities: 'Wifi Kitchen Washer',
  tag_line: 'Stylish NOPA Pad'
  )

  l4 = Listing.create!(
  owner_id: 2,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94559',
  state: 'California',
  country: 'United States of America',
  lat: 37.804720,
  long: -122.268390,
  tags: 'OMG Luxe',
  property_type: 'Apartment',
  max_guests: 2,
  night_price: 294,
  cleaning_fee: 75,
  description: 'Open the lanai doors and refresh yourself in this private cabana and patio. Radiant with light, warmth, and reclaimed coastal redwood, the cozy cabana opens into a lush garden with a hot tub and chaise lounges for a soothing staycation or work reprieve.',
  num_bedrooms: 1,
  num_beds: 2,
  num_baths: 1,
  amenities: 'Wifi Kitchen Washer',
  tag_line: 'Private Guest Cabana ⌯ Hot Tub ⌯ Dolores Park ⌯ The Mission'
  )

  puts "Done!"
end