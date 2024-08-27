"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { searchLocations } from "@/lib/redux/slices/locationSlice";
import { Location } from "../../../@types/location.type";
import { useRouter } from "next/router";
import { Title } from "../ui/Title";
import { Mic, Scan, Search } from "lucide-react";
import debounce from "lodash.debounce";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const locations = useSelector(
    (state: RootState) => state.locations as Location[]
  );

  // Debounced function to handle search
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery) {
        setIsLoading(true);
        await dispatch(searchLocations(searchQuery));
        setIsLoading(false);
      }
    }, 500), // 500ms debounce delay
    [dispatch]
  );

  // Trigger debounced search on query change
  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setIsLoading(false);
    }
  }, [query, debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredLocations = locations.filter(
    (location) =>
      location.cityName.toLowerCase().includes(query.toLowerCase()) ||
      location.localityName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (localityId: string) => {
    router.push(`/weather/${localityId}`);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      <div className="relative w-full flex flex-col items-center space-y-4">
        <Title
          title="Weather Info"
          className="text-center text-4xl sm:text-6xl lg:text-8xl font-bold"
        />
        <div className="relative w-full sm:w-[400px] lg:w-[600px]">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for a locality..."
            className="w-full py-3 px-10 rounded-full hover:shadow-lg border border-[#dfe1e5] h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            size={20}
          />
          <Mic
            className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            size={20}
          />
          <Scan
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            size={20}
          />
        </div>
        {query && (
          <ul className="relative w-full sm:w-[400px] lg:w-[600px] bg-white rounded-lg shadow-lg mt-2 p-2 space-y-2 z-50">
            {isLoading ? (
              <li className="text-center text-gray-500">Loading...</li>
            ) : filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <li
                  key={location.localityId}
                  className="py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSelect(location.localityId)}
                >
                  {location.localityName} - {location.cityName}
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
