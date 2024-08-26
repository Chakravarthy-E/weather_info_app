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
    <div className="min-h-screen flex flex-col font-outfit mx-auto py-10 px-6 space-y-6 bg-gradient-to-br from-green-200 to-blue-300">
      {/* Greeting and Time */}
      <div className="text-center">
        <p className="text-3xl font-semibold">{greeting}</p>
        <p className="text-2xl">{currentTime}</p>
      </div>

      {/* Temperature */}
      <div className="text-center">
        <p className="text-8xl font-semibold">
          {temperature}°<span>C</span>
        </p>
      </div>

      {/* Weather Information Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
        <div className="flex items-center flex-col space-y-1 text-center">
          <Droplets size={50} />
          <p>Humidity</p>
          <p className="text-3xl font-bold">{humidity}%</p>
        </div>
        <div className="flex items-center flex-col space-y-1 text-center">
          <CloudRainWind size={50} />
          <p>Rain Accumulation</p>
          <p className="text-3xl font-bold">{rain_accumulation} mm</p>
        </div>
        <div className="flex items-center flex-col space-y-1 text-center">
          <CloudHail size={50} />
          <p>Rain Intensity</p>
          <p className="text-3xl font-bold">{rain_intensity} mm/h</p>
        </div>
        <div className="flex items-center flex-col space-y-1 text-center">
          <Wind size={50} />
          <p>Wind Speed</p>
          <p className="text-3xl font-bold">{wind_speed} m/s</p>
        </div>
        <div className="flex items-center flex-col space-y-1 text-center">
          <Waves size={50} />
          <p>Wind Direction</p>
          <p className="text-3xl font-bold">{wind_direction}°</p>
        </div>
      </div>
    </div>
  );
}
