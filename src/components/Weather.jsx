// src/components/Weather.jsx
// src/components/Weather.jsx
import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) {
        throw new Error('City not found');
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="weather-container">
      <h1 className="title">Weather</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
          />
          <h3>{weather.main.temp}°C</h3>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
