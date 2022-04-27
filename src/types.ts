export interface Weather {
  description: string;
  humidity: string;
  main: string;
  pressure: string;
  temperature: Temperature;
  wind: Wind;
  visibility: string;
}

export interface Temperature {
  feelsLike: string;
  tempActual: string;
  tempMin: string;
  tempMax: string;
}

export interface Wind {
  direction: string;
  speed: string;
}

export interface Time {
  sunrise: number;
  sunset: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherPayload {
  coords: Coordinates;
  time: Time;
  weather: Weather;
  name: string;
}

export type Units = 'imperial' | 'metric';
export interface WeatherResponse {
  coord: Coordinates;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ErrorResponse {
  cod: string;
  message: string;
}

export type ResponsePayload = WeatherResponse | ErrorResponse;
