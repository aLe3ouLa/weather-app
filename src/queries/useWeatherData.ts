import { useQuery } from "@tanstack/react-query";
import { useLocationData } from "./useLocationData";
import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

export const useWeatherData = () => {
  const { data: locationData, isLoading: isLocationLoading } =
    useLocationData();

  const params = {
    latitude: locationData?.lat || 52.374,
    longitude: locationData?.lon || 4.8897,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "apparent_temperature",
      "wind_speed_10m",
      "weather_code",
    ],
  };
  return useQuery({
    queryKey: ["weather", params],
    queryFn: async () => await fetchWeatherApi(url, params),
    enabled:
      isLocationLoading ||
      (params.latitude !== undefined && params.longitude !== undefined),
    select: (data) => data?.[0],
  });
};
