import { createSlice } from "@reduxjs/toolkit";

const cityData = ["Hyderabad", "Banglore", "Chennai", "Delhi", "Jaipur"];

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cities: [...cityData],
    sourceCity: "",     // selected city
    destinationCity: "",    // selected city
    date: null,
    // TODO - save the source city id and destination city id after fetching data from server
    sourceCityId: "",
    destinationCityId: ""
  },
  reducers: {
    addSourceCity: (state, action) => {
      state.sourceCity = action.payload;
    },
    addDestinationCity: (state, action) => {
      state.destinationCity = action.payload;
    },
    addDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { addSourceCity, addDestinationCity, addDate } = searchSlice.actions;
export default searchSlice;