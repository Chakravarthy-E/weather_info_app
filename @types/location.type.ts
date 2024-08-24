export interface Location {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  locality_weather_data: {
    humidity: any;
    rain_accumulation: any;
    rain_intensity: any;
    temperature: any;
    wind_direction: any;
    wind_speed: any;
  };
}
