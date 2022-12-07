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
  Reservation.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  ApplicationRecord.connection.reset_pk_sequence!('reservations')

  puts "Creating users..."
  User.create!(
    first_name: 'Demo',
    last_name: 'Demoington',
    email: 'demo@user.io',
    birthdate: "2000-01-01",
    password: 'password',
    bio: 'test 123'
  )

  u2 = User.create!(
    first_name: 'Mitchell',
    last_name: 'Jindra',
    email: 'jindra.mitch@gmail.com',
    birthdate: '1998-04-13',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u2.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/mitch.jpeg'), filename: 'mitch.jpeg')

  u3 = User.create!(
    first_name: 'Abigail',
    last_name: 'Hernandez',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u3.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/abigail.jpeg'), filename: 'abigail.jpeg')

  u4 = User.create!(
    first_name: 'Chris',
    last_name: 'Cheasty',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u4.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/chris.jpeg'), filename: 'chris.jpeg')

  u5 = User.create!(
    first_name: 'Paulo',
    last_name: 'Bocanegra',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u5.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/paulo.png'), filename: 'paulo.png')

  u6 = User.create!(
    first_name: 'Mike',
    last_name: 'Madsen',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u6.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/mike.jpeg'), filename: 'mike.jpeg')

  u7 = User.create!(
    first_name: 'Shuhei',
    last_name: 'Shibahara',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u7.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/shuhei.png'), filename: 'shuhei.png')

  u8 = User.create!(
    first_name: 'Dan',
    last_name: 'Culbertson',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u8.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/dan.jpeg'), filename: 'dan.jpeg')


  u9 = User.create!(
    first_name: 'Brendan',
    last_name: 'Tsuda',
    email: Faker::Internet.unique.email,
    birthdate: '1990-01-01',
    password: 'password',
    bio: 'I hope you are enjoying your time looking through this website! Feel free to reach out to Mitchell through any of the linked means on the website.'
  )
  u9.photo.attach(io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/profilepics/brendan.png'), filename: 'brendan.png')


  puts "Creating listings..."
  l1 = Listing.create!(
  owner_id: 2,
  street_address: '1515 Webster St',
  apt: 'Apt 421',
  city: 'Oakland',
  zip_code: '94612',
  state: 'California',
  country: 'United States',
  lat: 37.804720,
  long: -122.268390,
  tags: '',
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

  l1.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l1/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l1/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l1/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l1/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l1/5.webp'), filename: '5.png'}
  ])

  l2 = Listing.create!(
  owner_id: 2,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94103',
  state: 'California',
  country: 'United States',
  lat: 37.76748138995517,
  long: -122.41681589170459,
  tags: 'OMG Iconic',
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

  l2.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l2/1.png'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l2/2.png'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l2/3.png'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l2/4.png'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l2/5.png'), filename: '5.png'}
  ])


  l3 = Listing.create!(
  owner_id: 5,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94559',
  state: 'California',
  country: 'United States',
  lat: 37.781379315735464,
  long: -122.42801453104582,
  tags: 'Luxe Iconic',
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

  l3.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l3/l3_1.png'), filename: 'l3_1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l3/l3_2.png'), filename: 'l3_2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l3/l3_3.png'), filename: 'l3_3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l3/l3_4.png'), filename: 'l3_4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l3/l3_5.png'), filename: 'l3_5.png'}
  ])

  l4 = Listing.create!(
  owner_id: 7,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'San Francisco',
  zip_code: '94559',
  state: 'California',
  country: 'United States',
  lat: 37.773656534370254,
  long: -122.45072450511404,
  tags: 'OMG Iconic',
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

  l4.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l4/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l4/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l4/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l4/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l4/5.webp'), filename: '5.png'}
  ])

  l5 = Listing.create!(
  owner_id: 6,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'London',
  zip_code: Faker::Address.postcode,
  state: 'City of London',
  country: 'United Kingdom',
  lat: 51.50884977905996,
  long: -0.14822065953855157,
  tags: 'Iconic',
  property_type: 'Apartment',
  max_guests: 5,
  night_price: 284,
  cleaning_fee: 63,
  description: "This stunning, sophisticated and luxurious apartment is situated in one of the most enviable spots in the exclusive neighborhood of Mayfair in London and within seconds of both of London's best - Berkeley Square and Old Bond Street! YOU WILL HAVE THE ENTIRE APARTMENT.",
  num_bedrooms: 1,
  num_beds: 2,
  num_baths: 1,
  amenities: 'Wifi Kitchen Washer Dryer Workspace TV',
  tag_line: 'Luxurious Mayfair Loft'
  )

  l5.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l7/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l7/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l7/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l7/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l7/5.webp'), filename: '5.png'}
  ])

  l6 = Listing.create!(
  owner_id: 9,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'London',
  zip_code: Faker::Address.postcode,
  state: 'City of London',
  country: 'United Kingdom',
  lat: 51.493889588100124,
  long: -0.17939376034382448,
  tags: 'Luxe Iconic',
  property_type: 'Flat',
  max_guests: 6,
  night_price: 365,
  cleaning_fee: 75,
  description: 'Exceptional apartment in Kensington and Chelsea borough. Prime location: close to Holland Park, central line tube or overground trains, Westfield shopping centre, and High Street Kensington. Lots of nearby restaurants, bars, cafes, shops. Easy access to London underground for visiting all of central London tourist sights.',
  num_bedrooms: 3,
  num_beds: 3,
  num_baths: 2,
  amenities: 'Wifi Kitchen Washer',
  tag_line: 'Entire apartment in Kensington - 1 bedroom'
  )

  l6.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l6/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l6/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l6/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l6/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l6/5.webp'), filename: '5.png'}
  ])

  l7 = Listing.create!(
  owner_id: 4,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'London',
  zip_code: Faker::Address.postcode,
  state: 'City of London',
  country: 'United Kingdom',
  lat: 51.52193111774709,
  long: -0.18432146954481032,
  tags: 'OMG Iconic',
  property_type: 'Apartment',
  max_guests: 2,
  night_price: 260,
  cleaning_fee: 75,
  description: 'A stunning duplex, period conversion arranged over the top two floors of this impressive building in Little Venice, Central London. The accommodation comprises entrance hall off which master bedroom with en-suite bathroom, reception room with modern fireplace and open plan to a contemporary kitchen/breakfast room. A lovely modern spiral staircase leads up to the floor above with two good sized bedrooms and a modern shower room. The property also benefits from a private roof terrace.
',
  num_bedrooms: 1,
  num_beds: 1,
  num_baths: 1,
  amenities: 'Wifi Kitchen Washer',
  tag_line: 'Little Venice Luxury'
  )

  l7.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l5/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l5/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l5/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l5/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l5/5.webp'), filename: '5.png'}
  ])

  l8 = Listing.create!(
  owner_id: 3,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'London',
  zip_code: Faker::Address.postcode,
  state: 'City of London',
  country: 'United Kingdom',
  lat: 51.5144881462307,
  long: -0.17211308642898882,
  tags: 'Luxe Iconic',
  property_type: 'Flat',
  max_guests: 8,
  night_price: 521,
  cleaning_fee: 102,
  description: 'A very bright and spacious contemporary garden flat. Three double bedrooms, two bathrooms, huge open plan living area.

Stylish with very modern upto date fittings including under floor heating, Home Cinema, multi room audio.

Little Venice in Central London is a hidden gem famed for its canals and attractive, stucco-fronted houses. Just a 6 minute walk to Paddington Station , 12 minute walk to Hyde Park, 25 minute walk to Marble Arch. With three metro stations all within a 5 minute walk.
',
  num_bedrooms: 3,
  num_beds: 3,
  num_baths: 2,
  amenities: 'Wifi Kitchen TV Dryer Washer Workspace',
  tag_line: 'Paddington Garden Flat'
  )

  l8.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l8/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l8/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l8/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l8/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l8/5.webp'), filename: '5.png'}
  ])

l9 = Listing.create!(
  owner_id: 9,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'London',
  zip_code: Faker::Address.postcode,
  state: 'City of London',
  country: 'United Kingdom',
  lat: 51.511682154641,
  long: -0.13730676519168705,
  tags: 'Iconic',
  property_type: 'Flat',
  max_guests: 6,
  night_price: 452,
  cleaning_fee: 131,
  description: 'Light drenched 2 bed 2 bath apartment perfectly equipped as a place to work or relax. We are surrounded by Mayfair, Soho, Camden and Marylebone areas. Situated in a secure block with intercom access, a lift to the front door it is fully self-contained. Large open plan living / working spaces with work-desk and abundance of fresh air & natural light. An ideal office, showroom or meeting space.',
  num_bedrooms: 2,
  num_beds: 3,
  num_baths: 2,
  amenities: 'Wifi Kitchen Dryer TV Washer',
  tag_line: 'CLEAN OXFORD CIRCUS APARTMENT - MAYFAIR'
  )

  l9.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l9/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l9/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l9/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l9/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l9/5.webp'), filename: '5.png'}
  ])

l10 = Listing.create!(
  owner_id: 3,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'Solidaridad',
  zip_code: Faker::Address.postcode,
  state: 'Quintana Roo',
  country: 'Mexico',
  lat: 20.7732147634582, 
  long: -86.94892873895682,
  tags: 'Beach Tropical Luxe',
  property_type: 'House',
  max_guests: 10,
  night_price: 1600,
  cleaning_fee: 200,
  description: "Situated along the Mayan Riviera on the white sandy beachfront of Playa del Secreto, the Gran Tortuga luxury estate is one of the most sought-after destinations in the country. A favorite destination among elite vacationers, as well as giant sea turtles, Villa La Gran Tortuga is an incredibly private oasis, sure to make your secluded beach vacation dreams come true. Nearby, you will find golf, historical sites, natural wonders, and vibrant cities along the Mayan Riviera.",
  num_bedrooms: 5,
  num_beds: 7,
  num_baths: 5,
  amenities: 'Wifi Kitchen Washer TV Washer Hottub',
  tag_line: 'Villa La Gran Tortuga - 5Br - Sleeps 10'
  )

  l10.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l10/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l10/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l10/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l10/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l10/5.webp'), filename: '5.png'}
  ])

l11 = Listing.create!(
  owner_id: 6,
  street_address: Faker::Address.street_address,
  apt: '',
  city: 'Ko Tao',
  zip_code: Faker::Address.postcode,
  state: 'Surat Thani',
  country: 'Thailand',
  lat: 10.064880633215429, 
  long: 99.83802702812763,
  tags: 'Beach Tropical OMG Island',
  property_type: 'House',
  max_guests: 10,
  night_price: 761,
  cleaning_fee: 220,
  description: "Passambhati Villa is our exclusive villa at Cape Shark. The spacious villa of about 3000 sqft built in contemporary Thai style, is located at the very cape on a hillside about 35 metres above sea level. The villa has a 270° panoramic view over the ocean and the two closest bays. The villa has an outstanding infinity pool of 25 meters as well as outdoor salas and terraces of 5000 sqft. Passambhati Villa is the perfect hide-away, if you want an extraordinary and relaxing stay on Koh Tao.",
  num_bedrooms: 5,
  num_beds: 5,
  num_baths: 5,
  amenities: 'Wifi Kitchen TV Washer Pool',
  tag_line: 'PASSAMBHATI VILLA /Cape Shark Villas, 4-10 pers.'
  )

  l11.photos.attach([
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l11/1.webp'), filename: '1.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l11/2.webp'), filename: '2.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l11/3.webp'), filename: '3.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l11/4.webp'), filename: '4.png'},
    {io:URI.open('https://breezebnb-seed.s3.us-west-1.amazonaws.com/l11/5.webp'), filename: '5.png'}
  ])

  puts "Creating reviews..."
    Review.create!(
      user_id: 5,
      listing_id: 3,
      description: 'Amazing stay!',
      cleanliness: 5,
      accuracy: 5,
      location: 5,
      value: 5,
      communication: 4,
      check_in: 4
    )

    Review.create!(
      user_id: 5,
      listing_id: 9,
      description: 'Great location with so many amenities to enjoy! We really appreciated the space including the fantastic kitchen and living room.',
      cleanliness: 5,
      accuracy: 5,
      location: 5,
      value: 5,
      communication: 5,
      check_in: 5
    )

    # Review.create!(
    #   user_id: ,
    #   listing_id: ,
    #   review: ,
    #   cleanliness: ,
    #   accuracy: ,
    #   location: ,
    #   value: ,
    #   communication: ,
    #   check_in:
    # )

  puts "Done!"
end