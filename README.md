### Installation

1. Clone the repository `git clone git@github.com:jrymer/palmetto-backend.git`
2. `cd` into the repo you just cloned `cd palmetto-backend`
3. Install NodeJs v18 [NodeJs](https://nodejs.org/en/download/)
  - If you have `nvm` installed you can do
      - `nvm install`
      - `nvm use`
4. Run `npm install`
5. Run `npm run dev`
6. Navigate to `localhost:4000` and verify you see "Running"

### Usage

This Node servers exists to serve formatted weather data to the palmetto-frontend application.

The only endpoint of note is the `/search` endpoint which accepts, a city, lat, lon, and unit parameter in the url params.
Upon successful request to OpenWeatherMaps, a formatted response will be returned to the 200.

An example url would be `http://localhost:4000/search?city=Seattle&units=%22metric%22&appid=471ff37832bebfa6f9a5a94a2c0c4b34`

NOTE: I plan to delete the API key found in the `.env` file shortly after the application is recieved and tested.