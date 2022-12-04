import usePlacesAutocomplete, {
    getDetails,
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './SearchBar.css'


export const SearchBar = () => {
    const history = useHistory()

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        
        const results = await getGeocode({ address })
        let about = await JSON.stringify(results)
        const {lat, lng} = getLatLng(results[0])
        

        history.push(`/search/${lat}/${lng}/${address}/${about}`)
    
    };


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
}

const SearchWrapper = () => {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} libraries={["places"]}>
            <SearchBar></SearchBar>
        </Wrapper>
    );
}

export default SearchWrapper;