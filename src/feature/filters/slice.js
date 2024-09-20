import { createSlice } from "@reduxjs/toolkit";

export const filterType = {
  BUS_TYPES: "busTypes",
  PRICE_RANGE: "priceRange",
  DEPARTURE_TIME: "departureTime",
  BUS_PARTNER: "busPartner",
  BOARDING_POINTS: "boardingPoints",
  DROPPING_POINTS: "droppingPoints",
};

export const departureTime = {
  MORNING: "before10am",
  AFTERNOON: "10amTo5pm",
  EVENING: "5pmTo11pm",
  NIGHT: "after11pm",
};

const initialPriceRange = {
  range: [0, 5000],
  selectedRange: [0, 5000],
};

const initialState = {
  [filterType.BUS_TYPES]: {},
  [filterType.DEPARTURE_TIME]: {
    [departureTime.MORNING]: false,
    [departureTime.AFTERNOON]: false,
    [departureTime.EVENING]: false,
    [departureTime.NIGHT]: false,
  },
  [filterType.BUS_PARTNER]: {},
  [filterType.BOARDING_POINTS]: {},
  [filterType.DROPPING_POINTS]: {},
  [filterType.PRICE_RANGE]: initialPriceRange,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    togglePriceRange: (state, action) => {
      state[filterType.PRICE_RANGE].range = action.payload;
      state[filterType.PRICE_RANGE].selectedRange = action.payload;
    },
    toggleUpdatedPriceRange: (state, action) => {
      state[filterType.PRICE_RANGE].selectedRange = action.payload;
    },
    toggleStop: (state, { payload: { add, stopId, identifier } }) => {
      if (add) {
        state[identifier][stopId] = add;
      } else {
        delete state[identifier][stopId];
      }
    },
    clearAllFilters: () => initialState,
  },
});

export const {
  togglePriceRange,
  toggleUpdatedPriceRange,
  toggleStop,
  clearAllFilters,
} = filterSlice.actions;

export default filterSlice;
