"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/atoms/Loader";
import { useGetLocalityWeatherQuery } from "@/lib/redux/api/weatherApi";
import { useRouter } from "next/router";
import { Droplets, CloudHail, CloudRainWind, Wind, Waves } from "lucide-react";

export default function Location() {
  const router = useRouter();
  const { locality_id } = router.query;
  const localityId = Array.isArray(locality_id) ? locality_id[0] : locality_id;

  const { data, isLoading, error } = useGetLocalityWeatherQuery(localityId);

  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedTime = `${hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${ampm}`;
      setCurrentTime(formattedTime);

      if (hours < 12 && ampm === "AM") {
        setGreeting("Good Morning");
      } else if (hours < 6 && ampm === "PM") {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <Loader />;

  if (error || !data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
        <p className="text-xl font-semibold text-red-600">
          Error loading weather data.
        </p>
      </div>
    );

  const {
    humidity,
    rain_accumulation,
    rain_intensity,
    temperature,
    wind_direction,
    wind_speed,
  } = data.locality_weather_data;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-outfit mx-auto py-10 px-6 space-y-12 bg-gradient-to-br from-blue-200 to-indigo-400 text-white">
      {/* Greeting Section */}
      <div className="text-center space-y-2 animate-fadeIn">
        <p className="text-4xl font-bold">{greeting}</p>
        <p className="text-3xl">{currentTime}</p>
      </div>

      {/* Temperature Display */}
      <div className="text-center animate-fadeIn">
        <p className="text-7xl sm:text-8xl font-bold">
          {temperature}°<span className="text-4xl">C</span>
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center animate-fadeIn">
        <div className="flex flex-col items-center space-y-2 text-center border border-white bg-white bg-opacity-20 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-md">
          <Droplets size={50} />
          <p className="text-lg font-semibold">Humidity</p>
          <p className="text-3xl font-bold">{humidity}%</p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center border border-white bg-white bg-opacity-20 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-md">
          <CloudRainWind size={50} />
          <p className="text-lg font-semibold">Rain Accumulation</p>
          <p className="text-3xl font-bold">{rain_accumulation} mm</p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center border border-white bg-white bg-opacity-20 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-md">
          <CloudHail size={50} />
          <p className="text-lg font-semibold">Rain Intensity</p>
          <p className="text-3xl font-bold">{rain_intensity} mm/h</p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center border border-white bg-white bg-opacity-20 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-md">
          <Wind size={50} />
          <p className="text-lg font-semibold">Wind Speed</p>
          <p className="text-3xl font-bold">{wind_speed} m/s</p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center border border-white bg-white bg-opacity-20 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-md">
          <Waves size={50} />
          <p className="text-lg font-semibold">Wind Direction</p>
          <p className="text-3xl font-bold">{wind_direction}°</p>
        </div>
      </div>
    </div>
  );
}
