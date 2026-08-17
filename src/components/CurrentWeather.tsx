import type { TimeOfDay } from "../utils/timeOfDay";
import "./CurrentWeather.css";

const ColorsOfPartsOfDay = {
  MORNING: "#699bce",
  AFTERNOON: "#e2ca9a",
  EVENING: "#681b7a",
  NIGHT: "#23384d",
} as const;

export const CurrentWeather = ({
  temperature,
  location,
  partOfDay,
}: {
  temperature: number;
  location: string;
  partOfDay: (typeof TimeOfDay)[keyof typeof TimeOfDay];
}) => {
  return (
    <div className="container">
      <article
        className="current-weather"
        style={{
          backgroundColor: ColorsOfPartsOfDay[partOfDay],
          color:
            partOfDay === "NIGHT" || partOfDay === "EVENING"
              ? "#FFFFFF"
              : "#000000",
        }}
      >
        <p className="location">{location}</p>
        {partOfDay === "MORNING" || partOfDay === "AFTERNOON" ? (
          <div className="sun"></div>
        ) : (
          <div className="moon"></div>
        )}
        <p className="temperature">{Math.round(temperature)}°C</p>
      </article>
      <div className="cloud"></div>
    </div>
  );
};
