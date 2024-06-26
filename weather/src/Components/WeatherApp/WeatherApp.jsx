import React, { useState } from "react";
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {

    let api_key = "bf38d0a82fe8ff2be1f78d678f6c1641";

    const [wicon, setWicon] = useState(cloud_icon);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");


    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            handleError("Noch nichts eingegeben.");
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        try {
            let response = await fetch(url);
            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temprature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
            temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
            location[0].innerHTML = data.name;

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(clear_icon);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(cloud_icon);
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWicon(rain_icon);
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWicon(snow_icon);
            }
            else {
                setWicon(clear_icon);
            }
        } catch (error) {
            handleError("Fehler beim Abrufen der Wetterdaten. Bitte versuchen Sie es erneut.");
        }

    }

    //Um im Inputfeld Enter drücken zu können und damit gleich zu Suchen
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            search();
        }
    }

    const Popup = ({ message }) => {
        return (
            <div className="popup">
                {message}
            </div>
        );
    };

    //Wie lange das PopUp angezeigt werden soll
    const handleError = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);  // Popup schließt sich nach 3 Sekunden
    };



    return (
        <div className="container">
            {showPopup && <Popup message={popupMessage} />}
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" onKeyDown={handleKeyDown} />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="wather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp