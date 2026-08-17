import { createContext, useContext, useState } from "react";

type Unit = "imperial" | "metric";

interface Weather { unit: Unit; setUnit: (value: Unit) => void; location: string; setLocation: (location: string) => void }

const WeatherContext = createContext<Weather | undefined>(undefined)

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [unit, setUnit] = useState<Unit>("metric");
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