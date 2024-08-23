import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { locationData } from "../../../../data/locationsData";

interface Location {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
}

const initialState: Location[] = locationData;

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    searchLocations: (state, action: PayloadAction<string>) => {
      return initialState.filter(
        (location) =>
          location.cityName
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          location.localityName
            .toLowerCase()
            .includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { searchLocations } = locationSlice.actions;
export default locationSlice.reducer;
