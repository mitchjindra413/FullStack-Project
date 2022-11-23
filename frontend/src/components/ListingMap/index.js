import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory, useParams } from "react-router-dom";
import './ListingMap.css'
import house from './house.png'

const ListingMap = ({
    listings,
    highlightedListing,
    mapOptions = {},
    mapEventHandlers = {},
    markerEventHandlers = {}
}) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();
    const {listingId} = useParams()

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                mapId: 'a5603dc640688f92',
                center: {
                    lat: 37.773972,
                    lng: -122.431297
                }, 
                zoom: 12,
                clickableIcons: false,
                disableDefaultUI: true,
                ...mapOptions,
            }));
        }
    }, [mapRef, map, mapOptions]);

    
    useEffect(() => {
        if (map) {
            const listeners = Object.entries(mapEventHandlers).map(([event, handler]) =>
                window.google.maps.event.addListener(
                    map,
                    event,
                    (...args) => handler(...args, map)
                )
            );

            return () => listeners.forEach(window.google.maps.event.removeListener);
        }
    }, [map, mapEventHandlers]);

    
    useEffect(() => {
        if (map) {
            listings.forEach((listing) => {
                if (markers.current[listing.id]) return;

                let marker
                if(listingId == null) {
                    marker = new window.google.maps.Marker({
                        map,
                        position: new window.google.maps.LatLng(listing.lat, listing.long),
                        label: {
                            text: `$${listing.nightPrice}`,
                            fontWeight: 'bold',
                            color: 'black'
                        },
                        icon: {
                            path: `
                                M 1,0 
                                L 2,0 
                                A 1 1 0 0 1 3,1
                                A 1 1 0 0 1 2,2
                                L 1,2 
                                A 1 1 0 0 1 0,1
                                A 1 1 0 0 1 1,0
                                z
                                `,
                            fillOpacity: 1,
                            fillColor: 'white',
                            strokeColor: 'black',
                            strokeWeight: 1,
                            scale: 15,
                            labelOrigin: new window.google.maps.Point(1.5, 1),
                            anchor: new window.google.maps.Point(1.5, 1)
                        },
                    })
                } else {
                    marker = new window.google.maps.Marker({
                        map,
                        position: new window.google.maps.LatLng(listing.lat, listing.long),
                        icon: house
                    })
                }

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(listing));
                });
                markers.current[listing.id] = marker;
            })

            
            Object.entries(markers.current).forEach(([listingId, marker]) => {
                if (listings.some(listing => listing.id.toString() === listingId)) return;

                marker.setMap(null);
                delete markers.current[listingId];
            })
        }
    }, [listings, history, map, markerEventHandlers]);

    
    useEffect(() => {
        Object.entries(markers.current).forEach(([listingId, marker]) => {
            const label = marker.getLabel();
            const icon = marker.getIcon();

            if (parseInt(listingId) === highlightedListing) {
                marker.setLabel({ ...label, color: 'white' });
                marker.setIcon({ ...icon, fillColor: 'black' });
            } else {
                marker.setLabel({ ...label, color: 'black' });
                marker.setIcon({ ...icon, fillColor: 'white' });
            }
        });
    }, [markers, highlightedListing]);

    return (
        <div ref={mapRef} className="map">
            Map
        </div>
    );
}

const ListingMapWrapper = (props) => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <ListingMap {...props} />
        </Wrapper>
    );
}

export default ListingMapWrapper;