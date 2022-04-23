import express from "express";

const seattle = {
  coord: {
    lon: -122.3321,
    lat: 47.6062,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 282.87,
    feels_like: 281,
    temp_min: 280.75,
    temp_max: 285.55,
    pressure: 1027,
    humidity: 79,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 190,
  },
  clouds: {
    all: 100,
  },
  dt: 1650731651,
  sys: {
    type: 2,
    id: 2004026,
    country: "US",
    sunrise: 1650719123,
    sunset: 1650769769,
  },
  timezone: -25200,
  id: 5809844,
  name: "Seattle",
  cod: 200,
};

const app = express();

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/search", async (req, res) => {
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
  // const response = await fetch(url);
  // const data = await response.json();
  res.send(seattle);
});

// https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f
