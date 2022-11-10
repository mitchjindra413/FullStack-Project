import { Wrapper } from "@googlemaps/react-wrapper"
import { useRef, useState } from "react"
export const ListingMap = () => {
    const [map, setMap] = useState(null)
    const mapRef = useRef()

    
}

export const ListingMapWrapper = () => {
    <Wrapper apiKey="REACT_APP_MAPS_API_KEY">
        <ListingMap></ListingMap>
    </Wrapper>
}