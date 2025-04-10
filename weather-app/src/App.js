import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() 
{
  const [city, setCity] = useState('New York');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

    const apiKey = '64e18c883d784a91bab223559252103';
    // const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // References the .env API key
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
  

    const celsiusToFahrenheit = (celsius) => 
      {
        return (celsius * 9/5) + 32;
      };

    const fetchWeather = useCallback(() => 
      {
        console.log("Fetching weather for URL: ", url);  // Log the URL to check if the API key is there
        setLoading(true);  // Trigger loading state when fetching
        axios.get(url)
          .then((response) => 
            {
              console.log(response.data);  // Log the response data
              setForecast(response.data);
              setLoading(false);
            })
            
          .catch((error) => 
            {
              console.error('Error fetching weather data:', error);
              setLoading(false);
            });
      }, [url]);
  
    const handleCityChange = (event) => 
      {
        setCity(event.target.value);
      };
  
    useEffect(() => 
      {
        fetchWeather();  // Fetch data when the component mounts or 'fetchWeather' changes
      }, [fetchWeather]);
  
    return (
      <div className="App">
        <h1>3-Day Weather Forecast</h1>
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          forecast && (
            <div>
              <h2>Weather in {forecast.location.name}</h2>
              <h3>{forecast.current.temp_c}°C / {celsiusToFahrenheit(forecast.current.temp_c).toFixed(1)}°F</h3>
              <ul>
                {forecast.forecast.forecastday.map((day, index) => (
                  <li key={index}>
                    <h4>{day.date}</h4>
                    <p>{day.day.condition.text}</p>
                    <p>Min Temp: {day.day.mintemp_c}°C / {celsiusToFahrenheit(day.day.mintemp_c).toFixed(1)}°F</p>
                    <p>Max Temp: {day.day.maxtemp_c}°C / {celsiusToFahrenheit(day.day.maxtemp_c).toFixed(1)}°F</p>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    );
  }
  
  export default App;