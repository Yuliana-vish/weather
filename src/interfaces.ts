export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  lon: number;
  lat: number;
  timezone: string;
  timezone_offset: number;
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    sunrise: number;
    sunset: number;
    visibility: number;
    uvi: number;
    weather: [Weather];
    wind_speed: number;
    wind_deg: number;
  };
}
