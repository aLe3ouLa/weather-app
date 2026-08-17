import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";
import { useState } from "react";
import { CurrentWeather } from "./components/CurrentWeather";
import { timeOfDay } from "./utils/timeOfDay";
import { CountryInput } from "./components/CountryInput";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

// const url = "https://api.open-meteo.com/v1/forecast";

export const WeatherApp = () => {
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [unit, setUnit] = useState<"" | "imperial" | "metric">("");

//   const { data: locationData, isLoading: isLocationLoading } = useQuery({
//     queryKey: ["location", locationQuery],
//     queryFn: async () => {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&limit=1`,
//       );
//       if (!response.ok) {
//         throw new Error(`Nominatim error: ${response.status}`);
//       }

//       return response.json();
//     },
//     enabled: locationQuery.trim() !== "",
//   });

// const params = {
//     latitude: locationData?.[0]?.lat || 52.374,
//     longitude: locationData?.[0]?.lon || 4.8897,
//     daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
//     hourly: "temperature_2m",
//     current: "temperature_2m",
//   };

//   const { data: responses } = useQuery({
//     queryKey: ["weather", params],
//     queryFn: async () => await fetchWeatherApi(url, params),
//     enabled: params.latitude !== undefined && params.longitude !== undefined,
//   });

//   // Process first location. Add a for-loop for multiple locations or weather models
//   const response = responses?.[0];

//   if (!response) {
//     return <div>Loading...</div>;
//   }

//   const utcOffsetSeconds = response?.utcOffsetSeconds() || 0;
//   const current = response.current()!;
//   const hourly = response.hourly()!;
//   const daily = response.daily()!;
//   // Note: The order of weather variables in the URL query and the indices below need to match!
//   const weatherData = {
//     current: {
//       time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
//       temperature_2m: current.variables(0)!.value(),
//     },
//     hourly: {
//       time: Array.from(
//         {
//           length:
//             (Number(hourly.timeEnd()) - Number(hourly.time())) /
//             hourly.interval(),
//         },
//         (_, i) =>
//           new Date(
//             (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
//               1000,
//           ),
//       ),
//       temperature_2m: hourly.variables(0)!.valuesArray(),
//     },
//     daily: {
//       time: Array.from(
//         {
//           length:
//             (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
//         },
//         (_, i) =>
//           new Date(
//             (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
//               1000,
//           ),
//       ),
//       weather_code: daily.variables(0)!.valuesArray(),
//       temperature_2m_max: daily.variables(1)!.valuesArray(),
//       temperature_2m_min: daily.variables(2)!.valuesArray(),
//     },
//   };

//   const partOfDay = locationData?.[0]?.lon !== undefined ? timeOfDay(locationData[0].lon) : "MORNING";

//   if (isLocationLoading) {
//     return <div>Loading location...</div>;
//   }

  return (
    <>
    <Navbar />
    <Hero />
    <CountryInput setLocationQuery={setLocationQuery} />
      {/* {weatherData && locationQuery && ( */}
        <>
        {/* <CurrentWeather
          temperature={weatherData.current.temperature_2m}
          location={locationQuery}
          partOfDay={partOfDay}
        /> */}
        {/* <div>
            Max Temperature: {Math.round(weatherData.daily?.temperature_2m_max?.[0] || 0)}°C
            <br />
            Min Temperature: {Math.round(weatherData.daily?.temperature_2m_min?.[0] || 0)}°C
        </div> */}
        </>
      {/* )} */}
    </>
  );
};
