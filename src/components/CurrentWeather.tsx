import { useWeather } from "../provider/WeatherProvider";
import { getWeatherIcon } from "../utils/weatherIcon";
import "./CurrentWeather.css";

export const CurrentWeather = ({
  temperature,
  weather_code,
}: {
  temperature: number;
  weather_code:  number | undefined;
}) => {
  const { location, convertTemperature, temperatureUnit } = useWeather();
  const now = new Date();
  return (
      <article
        className="current-weather"
      >
        <div>
          <p className="location">{location}</p>
          <p>{now.toISOString()}</p>
        </div>
        <img width="50"  {...getWeatherIcon(weather_code)}/>
        <p className="temperature">
          {Math.round(convertTemperature(temperature))}{temperatureUnit}
        </p>
      </article>
  );
};
