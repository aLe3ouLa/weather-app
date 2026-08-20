import { Hero } from "./components/Hero";
import { CurrentCityInfo } from "./components/CurrentCityInfo";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { ErrorState } from "./components/ErrorState";
import { transformToWeatherData } from "./utils/transformToWeatherData";
import { useWeatherData } from "./queries/useWeatherData";

const now = Date.now();
const placeholderDaily = {
  time: Array.from({ length: 7 }, (_, i) => new Date(now + i * 86_400_000)),
  weather_code: null,
  temperature_2m_max: null,
  temperature_2m_min: null,
};
const placeholderHourly = {
  time: Array.from({ length: 8 }, (_, i) => new Date(now + i * 3_600_000)),
  temperature_2m: null,
  weather_code: null,
};

export const WeatherApp = () => {

  const {
    data: weather,
    isLoading,
    error,
    refetch
  } = useWeatherData();

  const weatherData = transformToWeatherData(weather);

  if (error) {
    return (
      <>
        <Hero />
        <ErrorState refetch={refetch} />
      </>
    );
  }

  return (
    <>
      <Hero />
      <div
        style={{ display: "grid", gap: "26px", gridTemplateColumns: "2fr 1fr", padding: "0 60px", opacity: isLoading ? 0.5 : 1 }}
        aria-busy={isLoading}
      >
        <div style={{ display: "flex", gap: "26px", flexDirection: "column" }}>
          <CurrentCityInfo current={weatherData ? { ...weatherData.current } : undefined} />
          <DailyForecast daily={weatherData ? { ...weatherData.daily } : placeholderDaily} />
        </div>
        <HourlyForecast hourly={weatherData ? { ...weatherData.hourly } : placeholderHourly} />
      </div>
    </>
  );
};
