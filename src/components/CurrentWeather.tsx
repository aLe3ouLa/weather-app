import { useWeather } from "../provider/WeatherProvider";
import type { TimeOfDay } from "../utils/timeOfDay";
import "./CurrentWeather.css";

export const CurrentWeather = ({
  temperature,
  partOfDay,
}: {
  temperature: number;
  partOfDay: (typeof TimeOfDay)[keyof typeof TimeOfDay];
}) => {
  const { location} = useWeather();
  const now = new Date();
  return (
      <article
        className="current-weather"
      >
        <div>
          <p className="location">{location}</p>
          <p>{now.toISOString()}</p>
        </div>
        {partOfDay === "MORNING" || partOfDay === "AFTERNOON" ? (
          <img width="50" src="src/assets/images/icon-sunny.webp" alt="sunny" />
        ) : (
          <img width="50" src="src/assets/images/icon-overcast.webp" alt="overcast" />
        )}
        <p className="temperature">{Math.round(temperature)}°C</p>
      </article>
  );
};
