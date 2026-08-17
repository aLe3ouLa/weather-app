import { useState } from "react";

export const CountryInput = ({ setLocationQuery }: { setLocationQuery: (location: string) => void }) => {
  const [location, setLocation] = useState<string>("");

  return (<>
    <input
      type="text"
      placeholder="Search for a place..."
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button type="button" onClick={() => setLocationQuery(location)}>Search</button>
    </>
  );
};
