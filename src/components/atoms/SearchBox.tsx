"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { searchLocations } from "@/lib/redux/slices/locationSlice";
import { Location } from "../../../@types/location.type";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector(
    (state: RootState) => state.locations as { locations: Location[] }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const value = e.target.value;
    setQuery(value);
    dispatch(searchLocations(value));
    setIsLoading(false);
  };

  const filteredLocations = locations.filter(
    (location: any) =>
      location.cityName.toLowerCase().includes(query.toLowerCase()) ||
      location.localityName.toLowerCase().includes(query.toLowerCase()) ||
      location.localityId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a locality..."
      />
      {query && (
        <ul>
          {isLoading ? (
            <li>Loading...</li>
          ) : filteredLocations.length > 0 ? (
            filteredLocations.map((location: any) => (
              <li key={location.localityId}>
                {location.localityName} - {location.cityName}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
