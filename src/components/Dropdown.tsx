import { useWeather } from '../provider/WeatherProvider';
import './Dropdown.css'
export const Dropdown = () => {
    const { isImperial, setUnit } = useWeather();

    return <div className="dropdown">
        <button
            className="dropdown-toggle"
            onClick={() => setUnit(isImperial ? "metric" : "imperial")}
        >
            Switch to {isImperial ? "Metric" : "Imperial"}
        </button>
        <div>
            <h2>Temperature</h2>
            <p>{!isImperial && "✓ "}Celcious (C)</p>
            <p>{isImperial && "✓ "}Fahrenheit (F)</p>
        </div>
        <div>
            <h2>Wind Speed</h2>
            <p>{!isImperial && "✓ "}KM/H</p>
            <p>{isImperial && "✓ "}mph</p>
        </div>
        <div>
            <h2>Precipitation</h2>
            <p>{!isImperial && "✓ "}Millimiters(mm)</p>
            <p>{isImperial && "✓ "}Inches (in)</p>
        </div>
    </div>
}