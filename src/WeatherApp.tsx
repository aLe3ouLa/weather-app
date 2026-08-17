import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";
import { CurrentWeather } from "./components/CurrentWeather";
import { timeOfDay } from "./utils/timeOfDay";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useWeather } from "./provider/WeatherProvider";
import { SecondaryInfo } from "./components/SecondaryInfo";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";

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
    hourly: "temperature_2m",
    current: ["temperature_2m", "relative_humidity_2m", "precipitation", "apparent_temperature", "wind_speed_10m"],
  };

  const { data: responses } = useQuery({
    queryKey: ["weather", params],
    queryFn: async () => await fetchWeatherApi(url, params),
    enabled: params.latitude !== undefined && params.longitude !== undefined,
  });

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses?.[0];

  if (!response) {
    return <div>Loading...</div>;
  }

  const utcOffsetSeconds = response?.utcOffsetSeconds() || 0;
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;
  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      apparent_temperature: current.variables(3)!.value(),
      wind_speed_10m: current.variables(4)!.value(),
	},
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),

    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_max: daily.variables(1)!.valuesArray(),
      temperature_2m_min: daily.variables(2)!.valuesArray(),
    },
  };

  const partOfDay = locationData?.[0]?.lon !== undefined ? timeOfDay(locationData[0].lon) : "MORNING";

  if (isLocationLoading) {
    return <div>Loading location...</div>;
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
          partOfDay={partOfDay}
        /> 
        <SecondaryInfo current={{...weatherData.current}} />
        <DailyForecast daily={{...weatherData.daily}} /> 
        </div>
        <HourlyForecast />
        </div>
       )}
    </>
  );
};
