import { ErrorResponse, Units, WeatherPayload, WeatherResponse } from 'types';

/**
 * Takes a raw payload and formats it so the UI can read it more easily.
 *
 * @param {WeatherResponse} payload Response from the OWM API
 * @param {Units} units Units the user has chosen
 * @return {*}  {WeatherPayload}
 */
export const formatPayload = (payload: WeatherResponse, units: Units): WeatherPayload => {
  const tempUnit = units === 'imperial' ? 'F' : 'C';
  return {
    coords: {
      lat: payload.coord.lat,
      lon: payload.coord.lon,
    },
    time: {
      sunrise: payload.sys.sunrise,
      sunset: payload.sys.sunset,
    },
    weather: {
      description: payload.weather[0].description,
      humidity: `${payload.main.humidity}%`,
      main: payload.weather[0].main,
      pressure: `${payload.main.pressure} hPa`,
      temperature: {
        feelsLike: `${payload.main.feels_like}\xB0 ${tempUnit}`,
        tempActual: `${payload.main.temp}\xB0 ${tempUnit}`,
        tempMin: `${payload.main.temp_min}\xB0 ${tempUnit}`,
        tempMax: `${payload.main.temp_max}\xB0 ${tempUnit}`,
      },
      wind: {
        direction: `${payload.wind.deg}\xB0`,
        speed: `${payload.wind.speed} ${units === 'imperial' ? 'mph' : 'mps'}`,
      },
      visibility: `${payload.visibility / 10} km`,
    },
    name: payload.name,
  };
};

/**
 * Type guard to check what type the response is
 *
 * @param {(ErrorResponse | WeatherResponse)} response
 * @return {*}  {response is ErrorResponse}
 */
export const isErrorResponse = (
  response: ErrorResponse | WeatherResponse
): response is ErrorResponse => {
  if ('cod' in response && response.cod !== 200) {
    return true;
  }
  return false;
};
