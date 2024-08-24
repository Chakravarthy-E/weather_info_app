import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherData } from "../../../../@types/location.type"; // Ensure WeatherData type is correctly imported

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEATHER_API_URL,
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("X-Zomato-Api-Key", API_KEY);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLocalityWeather: builder.query<WeatherData, string | undefined>({
      query: (localityId) =>
        `get_locality_weather_data?locality_id=${localityId}`,
    }),
  }),
});

export const { useGetLocalityWeatherQuery } = weatherApi;
