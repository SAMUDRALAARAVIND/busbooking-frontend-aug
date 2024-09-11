import { createSlice } from "@reduxjs/toolkit";


const busPartners = [
  "RedBus",
  "Volvo Bus",
  "Greenline Travels",
  "VRL Travels",
  "SRS Travels",
  "National Travels",
  "Orange Tours",
  "KPN Travels",
  "Sharma Transport",
  "Jabbar Travels",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

// TODO: write the logic as per the need
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    priceDrop: false,
    busType: {
      AC: false,
      Sleeper: false,
      NonAC: false,
      Seater: false
    },
    busTiming: {
      before10am: false,
      between10amAnd5pm: false,
      between5pmAnd11pm: false,
      after11pm: false
    },
    busPartners: busPartners,
    cities : cities,
  },

  reducers: {
    togglePriceDrop: (state) => {
      state.priceDrop =!state.priceDrop;
    },
    toggleBusType: (state, action) => {
      state.busType[action.payload.type] = action.payload.checked;
    },
    toggleBusTiming: (state, action) => {
      state.busTiming[action.payload.type] = action.payload.checked;
    }
  },
});


export const { togglePriceDrop, toggleBusType, toggleBusTiming } = filtersSlice.actions;

export default filtersSlice;
