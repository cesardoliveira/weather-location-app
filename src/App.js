import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: "en",
          units: "metric",
        },
      }
    );

    setWeather(response.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (!location) {
    return <Fragment>Enable location to use Weather Location.</Fragment>;
  } else if (!weather) {
    return <Fragment>Looding weather...</Fragment>;
  } else {
    return (
      <Fragment>
        <h3>
          Your current location approximately: {weather['name']}
        </h3>
        <hr />
        <ul>
          <li>Desciption: {weather['weather'][0]['description']}</li>
          <li>Now: {weather['main']['temp']}°</li>
          <li>High: {weather['main']['temp_max']}°</li>
          <li>Low: {weather['main']['temp_min']}°</li>
          <li>Pressure: {weather['main']['pressure']} hpa</li>
          <li>Humidity: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
