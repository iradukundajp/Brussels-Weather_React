import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Weather from "./Weather";
import "./WeatherContainer.css";

const WeatherContainer = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=50.8503&longitude=4.3517&hourly=temperature_2m",
        );
        if (response.status === 200) {
          setWeatherInfo(response.data);
        } else {
          throw new Error(`Failed with status ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getWeatherInfo();
  }, []);

  return (
    <div className="container">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {weatherInfo && <Weather weather={weatherInfo} />}
    </div>
  );
};

export default WeatherContainer;
