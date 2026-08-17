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

    console.log(daily)
    return (
        <article className="daily-forecast-wrapper">
            <h2>Daily Forecast</h2>
            <div className="daily-forecast-container">
                {daily.time.map((d, index) => {
                    console.log(d)
                    return (<div className="daily-forecast-box" key={d.getDate()}>
                <p>{Days[d.getDay()]}</p>
                <p>icons</p>
                <div className="min-max-temp">
                    <p>{Math.round(daily?.temperature_2m_min?.[index] || 0)}</p>
                     <p>{Math.round(daily?.temperature_2m_max?.[index] || 0)}</p>
                </div>
            </div>)
                })}
           </div>
        </article>
    )
}