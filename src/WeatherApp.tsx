import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";
import { CurrentWeather } from "./components/CurrentWeather";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useWeather } from "./provider/WeatherProvider";
import { SecondaryInfo } from "./components/SecondaryInfo";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { ErrorState } from "./components/ErrorState";
import { transformToWeatherData } from "./utils/transformToWeatherData";

const url = "https://api.open-meteo.com/v1/forecast";

export const WeatherApp = () => {
const { location } = useWeather()
  const { data: locationData, isLoading: isLocationLoading } = useQuery({
    queryKey: ["location", location],
    queryFn: async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
      );
      if (!response.ok) {
        throw new Error(`Nominatim error: ${response.status}`);
      }

      return response.json();
    },
    enabled: location.trim() !== "",
  });

const params = {
    latitude: locationData?.[0]?.lat || 52.374,
    longitude: locationData?.[0]?.lon || 4.8897,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    current: ["temperature_2m", "relative_humidity_2m", "precipitation", "apparent_temperature", "wind_speed_10m", "weather_code"],
  };

  const { data: weather, isLoading, error } = useQuery({
    queryKey: ["weather", params],
    queryFn: async () => await fetchWeatherApi(url, params),
    enabled: params.latitude !== undefined && params.longitude !== undefined,
    select: (data) => data?.[0]
  });

  const weatherData = transformToWeatherData(weather);

  if (!weather || isLoading || isLocationLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorState />
  }

  return (
    <>
    <Navbar />
    <Hero />
      {weatherData && (
        <div style={{ display: "flex", gap: "16px"}}>
          <div style={{display: "flex", gap: "16px", flexDirection: "column"}}>
        <CurrentWeather
          temperature={weatherData.current.temperature_2m}
          weather_code={weatherData.current.weather_code}
        /> 
        <SecondaryInfo current={{...weatherData.current}} />
        <DailyForecast daily={{...weatherData.daily}} /> 
        </div>
        <HourlyForecast hourly={{...weatherData.hourly }} />
        </div>
       )}
    </>
  );
};
