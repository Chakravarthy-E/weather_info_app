"use client";
import Loader from "@/components/atoms/Loader";
import { useGetLocalityWeatherQuery } from "@/lib/redux/api/weatherApi";
import { useRouter } from "next/router";

export default function Location() {
  const router = useRouter();
  const { locality_id } = router.query;
  const localityId = Array.isArray(locality_id) ? locality_id[0] : locality_id;

  const { data, isLoading, error } = useGetLocalityWeatherQuery(localityId);

  if (isLoading) return <Loader />;
  if (error || !data) return <div>Error loading weather data.</div>;

  const {
    humidity,
    rain_accumulation,
    rain_intensity,
    temperature,
    wind_direction,
    wind_speed,
  } = data.locality_weather_data;

  return (
    <div className="font-outfit">
      <h1>Weather Data for Locality</h1>
      <div>
        <p>Temperature: {temperature}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Rain Accumulation: {rain_accumulation} mm</p>
        <p>Rain Intensity: {rain_intensity} mm/hr</p>
        <p>Wind Direction: {wind_direction}°</p>
        <p>Wind Speed: {wind_speed} m/s</p>
      </div>
    </div>
  );
}
