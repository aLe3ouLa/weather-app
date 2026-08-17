import "./SecondaryInfo.css";
export const SecondaryInfo = ({
  current,
}: {
  current?: Partial<{
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  }>;
}) => {
  return (
    <article className="secondary-info-wrapper">
      <div className="secondary-info-container">
        <p className="secondary-info-title">Feels Like</p>
        <p className="secondary-info-value">
          {Math.round(current?.apparent_temperature || 0)}
        </p>
      </div>
      <div className="secondary-info-container">
        <p className="secondary-info-title">Humidity</p>
        <p className="secondary-info-value">{current?.relative_humidity_2m}%</p>
      </div>
      <div className="secondary-info-container">
        <p className="secondary-info-title">Wind</p>
        <p className="secondary-info-value">
          {Math.ceil(current?.wind_speed_10m || 0)} km/h
        </p>
      </div>
      <div className="secondary-info-container">
        <p className="secondary-info-title">Precipitation</p>
        <p className="secondary-info-value">{current?.precipitation} mm</p>
      </div>
    </article>
  );
};
