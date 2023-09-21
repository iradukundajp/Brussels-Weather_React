import PropTypes from "prop-types";
import "./Weather.css";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import {
  BsFillCloudRainHeavyFill,
  BsCloudRain,
  BsSun,
  BsEmojiSunglasses,
} from "react-icons/bs";

const Weather = ({ weather }) => {
  const hourlyTemperatures = weather?.hourly?.temperature_2m || [];

  let currentDay = null;

  const getWeatherIcon = (temperature) => {
    if (temperature < 10) {
      return <BsFillCloudRainHeavyFill color="black" />;
    } else if (temperature < 15) {
      return <BsCloudRain color="white" />;
    } else if (temperature < 20) {
      return <BsSun color="white" />;
    } else {
      return <BsEmojiSunglasses color="yellow" />;
    }
  };

  const getTemperatureTrendIcon = (prevTemperature, currentTemperature) => {
    if (currentTemperature < prevTemperature) {
      return <FaLongArrowAltDown color="red" />;
    } else if (currentTemperature > prevTemperature) {
      return <FaLongArrowAltUp color="green" />;
    }
  };

  const renderTemperature = (hourIndex, temperature, weather) => {
    const dateTime = new Date(weather.hourly.time[hourIndex]);
    const hour = dateTime.getHours();
    const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
    const formattedTemperature =
      temperature % 1 === 0 ? `${temperature}.0` : temperature.toFixed(1);

    return (
      <div className="hourly-temperature" key={hourIndex}>
        <div className="hour">{formattedHour}</div>
        <div className="icon">{getWeatherIcon(temperature)}</div>
        <div className="temperature">
          {hourIndex > 0 &&
            getTemperatureTrendIcon(
              hourlyTemperatures[hourIndex - 1],
              temperature,
            )}
          {formattedTemperature}°C
        </div>
      </div>
    );
  };

  return (
    <div className="weather-container">
      {hourlyTemperatures.map((temperature, hourIndex) => {
        const dateTime = new Date(weather.hourly.time[hourIndex]);
        const day = dateTime.getDate();

        if (day !== currentDay) {
          currentDay = day;
          return (
            <div className="day" key={hourIndex}>
              <h2>Day {currentDay}</h2>
              {renderTemperature(hourIndex, temperature, weather)}
            </div>
          );
        }

        return renderTemperature(hourIndex, temperature, weather);
      })}
    </div>
  );
};

Weather.propTypes = {
  weather: PropTypes.shape({
    hourly: PropTypes.shape({
      temperature_2m: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      time: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Weather;
