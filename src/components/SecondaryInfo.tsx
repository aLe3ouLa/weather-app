export const SecondaryInfo = ({ current }: {
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
        <article style={{ display: "flex"}}>
            <div>
            <p>Feels Like</p>
            <p>{Math.round(current?.apparent_temperature || 0)}</p>
        </div>
        <div>
            <p>Humidity</p>
            <p>{current?.relative_humidity_2m}%</p>
        </div>
        <div>
            <p>Wind</p>
            <p>{Math.ceil(current?.wind_speed_10m || 0)} km/h</p>
        </div>
        <div>
            <p>Precipitation</p>
            <p>{current?.precipitation}mm</p>
        </div>
        </article>
    )
}