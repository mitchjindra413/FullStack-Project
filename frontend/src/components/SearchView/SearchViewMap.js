import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";


const SearchViewMap = () => {
    let {Ialo, Iahi, Walo, Wahi, lat, lng} = useParams()
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                mapId: 'a5603dc640688f92',
                center: {
                    lat: lat,
                    lng: lng
                },
                clickableIcons: false,
                disableDefaultUI: true,
                ...mapOptions,
            }));
        }
    }, [mapRef, map, mapOptions]);

    useEffect(() => {
        if(map){
            map.fitBounds()
        }
    })

    return (
        <div ref={mapRef} className="map">
            Map
        </div>
    );
}

export const SearchViewMapWrapper = () => {
    return (
        <Wrapper>
            <SearchViewMap></SearchViewMap>
        </Wrapper>
    )
}