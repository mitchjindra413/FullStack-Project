import { useParams } from "react-router-dom"

export const SearchView = () => {
    const {lat, lng, place} = useParams()

    return (
        <>
        <p>{place}</p>
        </>
    )
}