import PropTypes from "prop-types";

const WeatherListElement = (props) => {
    return (
        <li className="weather-item">
            <p className="time">{props.time}</p>
            <img src={props.weatherIcon} className="weather-icon"/>
            <p className="temperature">{props.temperature}°</p>
        </li>
    );
}
WeatherListElement.propTypes = {
    time: PropTypes.string.isRequired,
    weatherIcon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
};
export default WeatherListElement;