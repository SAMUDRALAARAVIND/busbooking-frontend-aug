import { createSlice } from "@reduxjs/toolkit";

// TODO: write the logic as per the need

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    tripsResponse: [],
    apiStatus: "init",
    city:null
  },
  reducers: {
    updateTripsStatus: (state, action) => {
      // { success, data }
      state.apiStatus = action.payload.status;
      if (action.payload.status === "success") {
        state.tripsResponse = action.payload.data;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
  },
});

export const { updateTripsStatus } = tripsSlice.actions;

export default tripsSlice;
