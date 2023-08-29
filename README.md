# Breezebnb
A fullstack clone of popular vacation rental site Airbnb. Make and manage reservations across the Bay and Greater London areas. (Psst we're looking to expand) Key technologies used include: React.js, Ruby on Rails, GoogleMaps, Amazon Web Services, PostgreSQL.

https://breezebnb.onrender.com/

## Functionality and MVPS
In breezebnb, users can:
- login or signup with a personal profile
- view listings in either a list or map view
- make and manage reservations: full CRUD
- write and manage reviews: full CRUD
- filter based on tags associated with listings
- search for locations using dynamic prediction

## Technologies, Libraries, and APIs
- Google Maps: Javascript
- Google Maps: Places
- React.js
- React/Redux
- Node.js
- Ruby on Rails
- PostgreSQL
- jBuilder
- AWS S3

## Features Demo
### Search
![Screen_Recording_2022-12-09_at_10_20_30_AM_AdobeExpress](https://user-images.githubusercontent.com/65314998/206772305-95c0c7ae-2398-4457-94a5-cb7601cb95ba.gif)

### Reservations
![Screen_Recording_2022-12-09_at_10_23_23_AM_AdobeExpress](https://user-images.githubusercontent.com/65314998/206770884-61f18788-3123-483f-a343-19d978b6be42.gif)

### Reviews
![Screen_Recording_2022-12-09_at_10_24_58_AM_AdobeExpress](https://user-images.githubusercontent.com/65314998/206770750-de4bb6f1-74b9-43b5-8557-c0f49aa14323.gif)

### Responsive Design
![Screen_Recording_2022-12-09_at_10_26_23_AM_AdobeExpress](https://user-images.githubusercontent.com/65314998/206769425-e6876d73-802e-49dc-ab93-8e3ee1b7e62c.gif)

## Code Examples
### jBuilder View
```
listing_reviews = @listing.reviews
json.reviews do 
    listing_reviews.each do |review|
        json.set! review.id do 
            json.extract! review,
                :id,
                :user_id,
                :listing_id, 
                :description,
                :cleanliness, 
                :accuracy, 
                :location, 
                :value, 
                :communication, 
                :check_in
            json.reviewerPic review.user.photo.url
            json.reviewerName review.user.first_name
            json.reviewerJoined review.user.created_at
        end
    end
end
```
jBuilder is the tool I used to construct JSON responses on the backend that could be sent and stored within my frontend state. Although jBuilder is slower than some other JSON constructor gems, it was chosen for its ease of maintenance and as a solid introduction to JSON constructors.  
### Redux Action
```
export const fetchListings = (filters) => async dispatch => {
    const filterParams = new URLSearchParams(filters)
    const res = await csrfFetch(`/api/listings?${filterParams}`)

    let data = await res.json()
    dispatch(receiveListings(data))
}
```
Redux was chosen to handle the need for a state due to its ability to update the state from a single location and its optimization performances, such as only re-rendering objects when needed. Because the backend requires a validation token to protect against CSRF attacks, csrfFetch is a custom fetch function to get the X-CSRF-TOKEN from session storage and format a valid API request.
### Searchbar React Element
```
return (
        <div className="searchbar-container">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search destinations"  
                />
                <ComboboxPopover
                    className="combobox-popover"
                >
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
 ```
Utilizing a predictive place search that was flexible was a key priority for me at the start of the project. Through reserach, I found the npm package Combobox which extends Google's Place API. Combined with the Google Maps react wrapper, this package allowed me to seperate the search bar from the map.
