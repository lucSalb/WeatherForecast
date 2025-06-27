import { use, useEffect, useState } from "react";
import WeatherListElement from "./weatherListElement";

const Weathercast = ({ userLocation }) => {
    const [temperature, setTemperature] = useState(0, 0);
    const [description, setDescription] = useState("Testing description");
    const [weatherIcon, setWeatherIcon] = useState("/icons/clear.svg");
    const [weatherList, setWeatherList] = useState([]);

    const getHourWeather = (weatherHour) => {
        const beginSpan = new Date().getHours() + 1;
        let result = [];
        for (let i = beginSpan; i < beginSpan + 5; i++) {
            const date = new Date(weatherHour[i].time.replace(" ", "T"));
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            result.push({
                time: `${hours}:${minutes}`,
                weatherIcon: weatherHour[i].condition.icon,
                temperature: weatherHour[i].temp_c
            });
        }
        return result;
    }
    const getHourWeather2Days = (weatherHour, weatherNextDay) => {
        const currentHour = new Date().getHours();
        const hoursNeeded = 5;
        const result = [];
        let hourIndex = currentHour + 1;
        while (hourIndex < 24 && result.length < hoursNeeded) {
            const hourData = weatherHour[hourIndex];
            const date = new Date(hourData.time.replace(" ", "T"));
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            result.push({
                time: `${hours}:${minutes}`,
                weatherIcon: hourData.condition.icon,
                temperature: hourData.temp_c
            });
            hourIndex++;
        }
        hourIndex = 0;
        while (result.length < hoursNeeded && hourIndex < weatherNextDay.length) {
            const hourData = weatherNextDay[hourIndex];
            const date = new Date(hourData.time.replace(" ", "T"));
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            result.push({
                time: `${hours}:${minutes}`,
                weatherIcon: hourData.condition.icon,
                temperature: hourData.temp_c
            });
            hourIndex++;
        }

        return result;
    };
    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?q=${userLocation}&days=2&tp=5&key=1ca50126e4b34d81881203900252606`)
            .then((response) => response.json())
            .then((data) => {
                setTemperature(data.current.temp_c);
                setDescription(data.current.condition.text);
                setWeatherIcon(data.current.condition.icon);
                if (new Date().getHours() > 20) {
                    const result = getHourWeather2Days(data.forecast.forecastday[0].hour, data.forecast.forecastday[0].hour);
                    setWeatherList(result);
                } else {
                    const result = getHourWeather(data.forecast.forecastday[1].hour);
                    setWeatherList(result);
                }
            });

    }, [userLocation]);
    return (
        <div className="weather-section">
            <div className="current-weather">
                <h5 className="description">{userLocation}</h5>
            </div>
            <div className="current-weather">
                <img src={weatherIcon} />
                <h2 className="temperature">{temperature}<span>°C</span></h2>
                <h5 className="description">{description}</h5>
            </div>
            {/*<!-- Hourly weather forecast list -->*/}
            <div className="hourly-weather">
                <ul className="weather-list">
                    {
                        weatherList.map((weather, index) => {
                            return <WeatherListElement key={index}
                                time={weather.time}
                                weatherIcon={weather.weatherIcon}
                                temperature={weather.temperature} />
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
export default Weathercast;