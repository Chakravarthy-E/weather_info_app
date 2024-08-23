import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherData {
  temperature: string;
  humidity: string;
  wind_speed: string;
  wind_direction: string;
  rain_intensity: string;
  rain_accumulation: string;
}
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEATHER_API_URL,
    prepareHeaders: (headers) => {
      headers.set("X-Zomato-Api-Key", API_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLocalityWeather: builder.query<WeatherData, string>({
      query: (localityId) =>
        `get_locality_weather_data?locality_id=${localityId}`,
      transformResponse: (response: unknown) => {
        const typedResponse = response as {
          locality_weather_data: WeatherData;
        };
        return typedResponse.locality_weather_data;
      },
    }),
  }),
});

export const { useGetLocalityWeatherQuery } = weatherApi;
