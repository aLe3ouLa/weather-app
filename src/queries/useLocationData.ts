import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../provider/WeatherProvider";

export const useLocationData = () =>{
    const { location } = useWeather()
 return  useQuery({
    queryKey: ["location", location],
    queryFn: async () => fetchLocationLongLat(location),
    enabled: location.trim() !== "",
    select: (data) => data?.[0]
  });}

const fetchLocationLongLat: (location: string) => Promise<Array<{lat: string, lon: string}>> = async (location) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
  );

  if (!response.ok) {
    throw new Error(`Nominatim error: ${response.status}`);
  }

  return response.json();
};
