import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    cities: [],            
    sourceCity: "",                                       //selected source city 
    destinationCity: "",                                  // selected destination city
    date: Math.floor(new Date().getTime() / 1000),
    status: "idle",        
    sourceCityId:"",                                      // selected source city id
    destinationCityId:""                                  // selected destination city id
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
    updateSourceCityId:(state,action) => {
      state.sourceCityId = action.payload;
    },
    updateDestinationCityId:(state,action) => {
      state.destinationCityId = action.payload;
    },
    updateCitiesList: (state, action) => {
      state.cities = action.payload.cities;
    },
    updateCitiesStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export const {
  addSourceCity,
  addDestinationCity,
  addDate,
  updateCitiesList,
  updateCitiesStatus,
  updateDestinationCityId,
  updateSourceCityId
} = searchSlice.actions;

export default searchSlice;