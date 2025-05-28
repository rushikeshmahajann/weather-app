
import React, { createContext, useContext, useState, useEffect } from "react";

const WeatherContext = createContext();

const API_KEY = "e52c522f13fb4b97b51102116252805";

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || ""
  );
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForcastData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (selectedCity = city) => {
    setLoading(true);
    setError("");
    try {
      const weatherRes = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}&aqi=yes`
      );

      if (!weatherRes.ok) throw new Error("City not found or API error");

      const weatherData = await weatherRes.json();
      const forecastRes = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedCity}&days=5&aqi=no&alerts=no`
      );

      if (!forecastRes.ok) throw new Error("Forcast for City not found or API error");

      const forecastData = await forecastRes.json();
      setWeatherData(weatherData);
      setForcastData(forecastData);
      setCity(selectedCity);


      localStorage.setItem("lastCity", selectedCity);
    } catch (err) {
      setError(err.message);
      setWeatherData();
      setForcastData();
    } finally {
      setLoading(false);
      console.log(weatherData);
      
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => fetchWeather(city), 30000);
    return () => clearInterval(interval);
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weatherData,
        error,
        loading,
        fetchWeather,
        forecastData
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
