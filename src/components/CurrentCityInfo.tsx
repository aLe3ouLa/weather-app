import { useWeather } from "../provider/WeatherProvider";
import { CurrentWeather } from "./CurrentWeather";
import "./CurrentCityInfo.css";
export const CurrentCityInfo = ({
  current,
}: {
  current?: Partial<{
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number
  }>;
}) => {
  const {
    isImperial,
    convertTemperature,
    convertWindSpeed,
    convertPrecipitation,
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,
  } = useWeather();
  const apparentTemperature = convertTemperature(current?.apparent_temperature || 0);
  const windSpeed = convertWindSpeed(current?.wind_speed_10m || 0);
  const precipitation = convertPrecipitation(current?.precipitation || 0);

  return (
    <section className="current-city-weather">
      <CurrentWeather
        temperature={current?.temperature_2m || 0}
        weather_code={current?.weather_code || 0}
      />
      <article className="secondary-info-wrapper">
        <div className="secondary-info-container">
          <p className="secondary-info-title">Feels Like</p>
          <p className="secondary-info-value">
            {Math.round(apparentTemperature)}{temperatureUnit}
          </p>
        </div>
        <div className="secondary-info-container">
          <p className="secondary-info-title">Humidity</p>
          <p className="secondary-info-value">{current?.relative_humidity_2m}%</p>
        </div>
        <div className="secondary-info-container">
          <p className="secondary-info-title">Wind</p>
          <p className="secondary-info-value">
            {Math.ceil(windSpeed)} {windSpeedUnit}
          </p>
        </div>
        <div className="secondary-info-container">
          <p className="secondary-info-title">Precipitation</p>
          <p className="secondary-info-value">
            {isImperial ? precipitation.toFixed(2) : precipitation} {precipitationUnit}
          </p>
        </div>
      </article>
    </section>
  );
};
