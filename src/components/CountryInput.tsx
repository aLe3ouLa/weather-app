import { useState } from "react";
import { useWeather } from "../provider/WeatherProvider";

export const CountryInput = () => {
  const [loc, setLoc] = useState<string>("");
  const { setLocation } = useWeather()

  return (<>
    <input
      type="text"
      placeholder="Search for a place..."
      value={loc}
      onChange={(e) => setLoc(e.target.value)}
    />
    <button type="button" onClick={() => setLocation(loc)}>Search</button>
    </>
  );
};
