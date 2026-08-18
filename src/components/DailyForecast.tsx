import { getWeatherIcon } from '../utils/weatherIcon';
import { useWeather } from '../provider/WeatherProvider';
import './DailyForecast.css';

const Days: Record<number, string> = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
} as const;

export const DailyForecast = ({daily}: {daily: {
    time: Date[];
    weather_code: Float32Array<ArrayBufferLike> | null;
    temperature_2m_max: Float32Array<ArrayBufferLike> | null;
    temperature_2m_min: Float32Array<ArrayBufferLike> | null;
}}) => {
    const { convertTemperature, temperatureUnit } = useWeather();

    return (
        <article className="daily-forecast-wrapper">
            <h2>Daily Forecast</h2>
            <div className="daily-forecast-container">
                {daily.time.map((d, index) => {
                    return (<div className="daily-forecast-box" key={d.getDate()}>
                <p>{Days[d.getDay()]}</p>
                <img width="50" {...getWeatherIcon(daily.weather_code?.at(index) || undefined)} />
                <div className="min-max-temp">
                    <p>{Math.round(convertTemperature(daily?.temperature_2m_min?.[index] || 0))}{temperatureUnit}</p>
                     <p>{Math.round(convertTemperature(daily?.temperature_2m_max?.[index] || 0))}{temperatureUnit}</p>
                </div>
            </div>)
                })}
           </div>
        </article>
    )
}