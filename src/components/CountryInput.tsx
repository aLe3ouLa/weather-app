import './CountryInput.css';

import { useState } from "react";
import { useWeather } from "../provider/WeatherProvider";

export const CountryInput = () => {
  const [loc, setLoc] = useState<string>("");
  const { setLocation } = useWeather()

  return (<>
    <div className="country-input-wrapper">
      <img className="country-input-icon" src="src/assets/images/icon-search.svg" alt="" />
      <input
        type="text"
        placeholder="Search for a place..."
        value={loc}
        onChange={(e) => setLoc(e.target.value)}
      />
    </div>
    <button className="country-input-button" type="button" onClick={() => setLocation(loc)}>Search</button>
    </>
  );
};
