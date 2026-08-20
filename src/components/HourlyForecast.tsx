import { getWeatherIcon } from "../utils/weatherIcon";
import { useWeather } from "../provider/WeatherProvider";
import "./HourlyForecast.css";

export const HourlyForecast = ({
  hourly,
}: {
  hourly: {
    time: Date[];
    temperature_2m: Float32Array<ArrayBufferLike> | null;
    weather_code: Float32Array<ArrayBufferLike> | null;
  };
}) => {
  const { convertTemperature, temperatureUnit } = useWeather();

  const now = new Date();
  const currentIndex = Math.max(
    0,
    hourly.time.findIndex((t) => t >= now),
  );

  return (
    <article className="hourly-forecast">
      <div className="hourly-forecast-title">
        <h2>Hourly Forecast</h2>
        select a date
      </div>
      <div className="hourly-forecast-list">
        {hourly.time.slice(currentIndex, currentIndex + 8).map((t, offset) => {
          const index = currentIndex + offset;
          const hour = t.getHours();
          const displayHour = hour % 12 === 0 ? 12 : hour % 12;
          const period = hour >= 12 ? "PM" : "AM";
          return (
            <div className="hourly-forecast-card" key={t.toISOString()}>
              <span className="hourly-forecast-time-icon">
                <img
                  width="20"
                  {...getWeatherIcon(
                    hourly.weather_code?.at(index) || undefined,
                  )}
                />
                <p>
                  {displayHour}
                  {period}
                </p>
              </span>
              <p>
                {Math.round(
                  convertTemperature(hourly.temperature_2m?.at(index) || 0),
                )}
                {temperatureUnit}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
};
