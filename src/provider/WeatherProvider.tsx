import { createContext } from "react";

const defaultValue = {
    unit: "metric" as "imperial" | "metric",
}

export const WeatherContext = createContext(defaultValue)