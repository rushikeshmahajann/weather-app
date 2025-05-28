import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import Search from "../icons/Search";
import Right from '../icons/Right';

const SearchInput = () => {
  const [input, setInput] = useState("");
  const { fetchWeather } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    fetchWeather(input);
    setInput("");
  };
  return (
    <form
      className="flex w-full font-montreal justify-between items-center px-2 py-1.5 border-gray-200 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <div className=" flex justify-center gap-3 items-center">
        <div className="stroke-gray-900 bg-gray p-2 rounded-full hover:stroke-gray-700">
          <Search />
        </div>
        
        <input
          className="focus:outline-none tracking-tight font-medium font-montreal text-xl"
          placeholder="Enter city name"
          type="text"
          autoFocus
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button className="stroke-gray-900 rounded-full p-2 bg-gray hover:stroke-gray-700" type="submit">
        <Right />
      </button>
    </form>
  );
};

export default SearchInput;
