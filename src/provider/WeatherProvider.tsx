import { createContext, useContext, useMemo, useState } from "react";
import { celsiusToFahrenheit } from "../utils/temperature";
import { kmhToMph } from "../utils/windSpeed";
import { mmToInches } from "../utils/precipitation";

type Unit = "imperial" | "metric";

interface Weather {
    unit: Unit;
    setUnit: (value: Unit) => void;
    location: string;
    setLocation: (location: string) => void;
    isImperial: boolean;
    convertTemperature: (celsius: number) => number;
    convertWindSpeed: (kmh: number) => number;
    convertPrecipitation: (mm: number) => number;
    temperatureUnit: string;
    windSpeedUnit: string;
    precipitationUnit: string;
}

const WeatherContext = createContext<Weather | undefined>(undefined)

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [unit, setUnit] = useState<Unit>("metric");
    const [location, setLocation] = useState('Amsterdam');
    const isImperial = unit === "imperial";

    const value = useMemo<Weather>(() => ({
        unit,
        setUnit,
        location,
        setLocation,
        isImperial,
        convertTemperature: (celsius) => isImperial ? celsiusToFahrenheit(celsius) : celsius,
        convertWindSpeed: (kmh) => isImperial ? kmhToMph(kmh) : kmh,
        convertPrecipitation: (mm) => isImperial ? mmToInches(mm) : mm,
        temperatureUnit: isImperial ? "°" : "°",
        windSpeedUnit: isImperial ? "mph" : "km/h",
        precipitationUnit: isImperial ? "in" : "mm",
    }), [unit, location, isImperial]);

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider')
    }
    return context;
}
