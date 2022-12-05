import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const SearchViewMap = (mapOptions = {}) => {
    let {lat, lng, about} = useParams()
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const [listings, setListings] = useState([])
    const markers = useRef({});
    const history = useHistory();
    let parsed = JSON.parse(about)
    

    useEffect(() => {
        if(!map){
            setMap(new window.google.maps.Map(mapRef.current, {
                mapId: 'a5603dc640688f92',
                zoom: 0,
                center: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                },
                clickableIcons: false,
                disableDefaultUI: true,
                ...mapOptions,
            }))
        }
        
    }, [mapRef, map, mapOptions]);

    useEffect(() => {
        if(map){
            map.fitBounds(parsed[0].geometry.viewport)
        }
    }, [map, mapRef, about])

    

    return (
        <div ref={mapRef} className="map">
            Map
        </div>
    );
}

export const SearchViewMapWrapper = () => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={["places"]}>
            <SearchViewMap></SearchViewMap>
        </Wrapper>
    )
}