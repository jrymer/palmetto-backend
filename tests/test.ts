import { server } from '../src/index';
import supertest from 'supertest';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
const requestWrapper = supertest(server);

const mock404 = {
  statusCode: 404,
  cod: 404,
  message: 'city not found',
  body: 'city not found',
};

const raw = {
  coord: {
    lon: -122.3321,
    lat: 47.6062,
  },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d',
    },
  ],
  base: 'stations',
  main: {
    temp: 16.42,
    feels_like: 15.61,
    temp_min: 14.89,
    temp_max: 18.29,
    pressure: 1014,
    humidity: 57,
  },
  visibility: 10000,
  wind: {
    speed: 3.09,
    deg: 280,
  },
  clouds: {
    all: 75,
  },
  dt: 1651450559,
  sys: {
    type: 2,
    id: 2004026,
    country: 'US',
    sunrise: 1651409512,
    sunset: 1651461645,
  },
  timezone: -25200,
  id: 5809844,
  name: 'Seattle',
  cod: 200,
};
const formatted = {
  coords: {
    lat: 47.6062,
    lon: -122.3321,
  },
  time: {
    sunrise: 1651409512,
    sunset: 1651461645,
  },
  weather: {
    description: 'broken clouds',
    humidity: '57%',
    main: 'Clouds',
    pressure: '1014 hPa',
    temperature: {
      feelsLike: '15.61° C',
      tempActual: '16.42° C',
      tempMin: '14.89° C',
      tempMax: '18.29° C',
    },
    wind: {
      direction: '280°',
      speed: '3.09 mps',
    },
    visibility: '1000 km',
  },
};

describe('Server test', () => {
  let spyFetch: any;
  beforeAll(() => {
    spyFetch = fetch as jest.MockedFunction<typeof fetch>;
  });
  afterEach(() => {
    spyFetch.mockClear();
  });
  afterAll((done) => {
    server && server.close(done);
    return;
  });

  it('Base route returns a 200', async () => {
    const res = await requestWrapper.get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Running');
  });
  it('Invalid search returns a 404', async () => {
    spyFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mock404),
      })
    );
    const res = await requestWrapper.get('/search');
    expect(spyFetch).toBeCalled();
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('city not found');
  });
  it('Valid search returns a 200', async () => {
    spyFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(raw),
      })
    );
    const res = await requestWrapper.get('/search?city=Seattle&units=metric');
    expect(spyFetch).toBeCalled();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(formatted);
  });
  it('Can accept lat lon', async () => {
    spyFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(raw),
      })
    );
    const res = await requestWrapper.get('/search?lat=10&lon=10&units=metric');
    expect(spyFetch).toBeCalled();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(formatted);
  });
});
