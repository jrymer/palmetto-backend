import express from 'express';
import { ResponsePayload, Units } from 'types';
import cors from 'cors';
import { formatPayload, isErrorResponse } from './utility';

const app = express();
app.use(cors());

// Export to use in tests
export const server = app.listen(4000, () => {
  console.log(`server running on port 4000`);
});

// Simple endpoint to verify server is running
app.get('/', (_, res) => {
  res.send('Running');
});

// Main search endpoint, accepts a city, lat and lon, and units. Takes that information and searches
// the OWM API and returns a weather response
app.get(
  '/search',
  async (req: { query: { city: string; lat: number; lon: number; units: Units } }, res) => {
    const { city, lat, lon, units } = req.query;
    let url: string = '';
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=${units}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=${units}`;
    }
    const response = await fetch(url);
    const data: ResponsePayload = await response.json();

    if (isErrorResponse(data)) {
      res.status(Number(data.cod)).send(data.message);
    } else {
      const formatted = formatPayload(data, units);
      res.send(formatted);
    }
  }
);
