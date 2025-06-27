import { useEffect, useRef } from "react";

const SearchLocation = ({ setUserLocation }) => {
    const api_key="";
    const searchInputRef = useRef(null);
    const handleSearchClick = (e) => {
        const value = searchInputRef.current?.value;
        if (!value) return;
        setUserLocation(value.toUpperCase());
    }
    const handleMyLocationClick = (e) => {
         navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const components = data.results[0].components;
                        const userCity = components.city || components.town || components.village;
                        setUserLocation(userCity);
                    });
            },
            (error) => {
                setUserLocation("KAUNAS");
            }
        )
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const components = data.results[0].components;
                        const userCity = components.city || components.town || components.village;
                        setUserLocation(userCity);
                    });
            },
            (error) => {
                setUserLocation("KAUNAS");
            }
        )
    }, []);
    return (
        <div className="search-section">
            <div className="input-wrapper">
                <button onClick={handleSearchClick} className="material-symbols-rounded search-btn">search</button>
                <input ref={searchInputRef} type="search" placeholder="Enter a city name" className="search-input" />
            </div>
            <button className="location-button" onClick={handleMyLocationClick}>
                <span className="material-symbols-rounded">my_location</span>
            </button>
        </div>
    );
}
export default SearchLocation;
