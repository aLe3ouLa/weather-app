import { CurrentWeather } from "./components/CurrentWeather";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SecondaryInfo } from "./components/SecondaryInfo";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { ErrorState } from "./components/ErrorState";
import { transformToWeatherData } from "./utils/transformToWeatherData";
import { useWeatherData } from "./queries/useWeatherData";

export const WeatherApp = () => {

  const {
    data: weather,
    isLoading,
    error,
  } = useWeatherData();

  const weatherData = transformToWeatherData(weather);

  if (!weather || isLoading ) {
    return <div>Loading...</div>;
  }

  if (!error) {
    return <ErrorState />;
  }

  return (
    <>
      <Hero />
      {weatherData && (
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <CurrentWeather
              temperature={weatherData.current.temperature_2m}
              weather_code={weatherData.current.weather_code}
            />
            <SecondaryInfo current={{ ...weatherData.current }} />
            <DailyForecast daily={{ ...weatherData.daily }} />
          </div>
          <HourlyForecast hourly={{ ...weatherData.hourly }} />
        </div>
      )}
    </>
  );
};
