import React, { Fragment, useEffect, useState } from "react";
import WeatherService from '../src/services/currentWeather';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const getWeather = async (lat, long) => {
    const response = await WeatherService.index(lat, long);
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
