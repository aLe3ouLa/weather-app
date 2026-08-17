import { createContext, useContext, useState } from "react";

interface Weather { unit: "imperial" | "metric"; setUnit: (value: "imperial" | "metric") => void; location: string; setLocation: (location: string) => void }

const WeatherContext = createContext<Weather | undefined>(undefined)

export const WeatherProvider = ({ children }) => {
    const [unit, setUnit] = useState<"imperial" | "metric">("metric");
    const [location, setLocation] = useState('Amsterdam');

    return <WeatherContext.Provider value={{
        unit,
        setUnit,
        location,
        setLocation
    }}>{children}</WeatherContext.Provider>
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider')
    }
    return context;
}