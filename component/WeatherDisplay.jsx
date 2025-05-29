import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import Toggle from "../icons/Toggle";

const WeatherDisplay = () => {
  const { weatherData, loading, forecastData } = useWeather();
  const [celcius, setCelcius] = useState(true);

  if (loading) return <p className="tracking-tigher text-gray-900 font-montreal text-4xl text-center my-8">Loading...</p>;

  if (!weatherData) return null;

  const { current, location } = weatherData;
  const { forecast } = forecastData;
  console.log(forecastData);

  const toggleTemperatureUnit = () => {
    setCelcius(!celcius);
  };
  const handleDate = (day) => {
    const date = new Date(day);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayName;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="mt-10 w-max bg-white px-18 py-6 md:px-18 md:py-10 rounded-3xl relative flex flex-col items-center justify-center">
        <h2 className="leading-6 tracking-tight text-xl md:text-2xl font-light text-gray-400">
          {location.name}, {location.country}
        </h2>
        <img
          className="flex my-1 justify-center items-center rounded-full w-12 h-12"
          src={current.condition.icon}
          alt={current.condition.text}
        />

        <div className="flex flex-col w-full justify-between items-center">
          <h3 className="text-7xl md:text-9xl tracking-tighter text-gray-800 relative">
            {celcius ? current.temp_c : current.temp_f}{" "}
            <span className="text-gray-400 tracking-tight text-xl md:text-2xl absolute">
              {celcius ? `°C` : `°F`}
            </span>{" "}
          </h3>
          <button
            className="bg-gray rounded-full w-max p-2 my-3 stroke-gray-900 hover:stroke-gray-700"
            onClick={toggleTemperatureUnit}
          >
            <Toggle />
          </button>
        </div>

        <span className="text-lg md:text-xl tracking-tight font-light text-gray-400">
          {current.condition.text}
        </span>

        <div className="flex flex-col items-center justify-center my-4">
          <h4 className="text-gray-400 tracking-tight font-light">Humidity</h4>
          <p className="text-gray-900 text-3xl md:text-4xl tracking-tighter">
            {current.humidity}{" "}
            <span className="font-light text-gray-400">%</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center my-3">
          <h4 className="text-gray-400 tracking-tight font-light">Wind</h4>
          <p className="text-gray-900 text-3xl md:text-4xl tracking-tighter">
            {current.wind_kph}{" "}
            <span className="font-light text-gray-400">km/h</span>
          </p>
        </div>
      </div>

      <div className="mt-10 w-[20rem] md:w-max bg-white px-6 py-4 rounded-3xl relative flex items-center gap-8 overflow-x-auto">
        {forecast.forecastday.map((item, index) => (
          <div className="font-montreal" key={index}>
            <div className="">
              <h3 className="tracking-tight text-sm md:text-base font-medium text-gray-400">
                {handleDate(item.date)}
              </h3>
              <img
               className="w-8 md:w-12"
                src={item.day.condition.icon}
                alt={item.day.condition.text}
              />
            </div>

            <div>
              <h5 className="text-xs md:text-base font-medium text-gray-400">max</h5>
              <p className="tracking-tighter text-sm md:text-base">{item.day.maxtemp_c}°C</p>
            </div>
            <div>
              <h5 className="text-xs md:text-base font-medium text-gray-400">avg</h5>
              <p className="tracking-tighter text-sm md:text-base ">{item.day.avgtemp_c}°C</p>
            </div>
            <div>
              <h5 className="text-xs md:text-base font-medium text-gray-400">min</h5>
              <p className="tracking-tighter text-sm md:text-base">{item.day.mintemp_c}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
