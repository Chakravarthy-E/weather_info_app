"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { searchLocations } from "@/lib/redux/slices/locationSlice";
import { Location } from "../../../@types/location.type";
import { useRouter } from "next/router";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const locations = useSelector(
    (state: RootState) =>
      state.locations as {
        [x: string]: any;
        locations: Location[];
      }
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

  const handleSelect = (localityId: string) => {
    router.push(`/weather/${localityId}`);
  };

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a locality..."
        className="w-96"
      />
      {query && (
        <ul className="w-96">
          {isLoading ? (
            <li>Loading...</li>
          ) : filteredLocations.length > 0 ? (
            filteredLocations.map((location: any) => (
              <>
                <li
                  key={location.localityId}
                  className="space-y-1"
                  onClick={() => handleSelect(location.localityId)}
                >
                  {location.localityName} - {location.cityName}
                </li>
                <hr />
              </>
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
