import Api from "./api";

const weatherService = {
  index: (lat, long) =>
    Api.get('/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: "en",
        units: "metric",
      },
    })
};

export default weatherService;
