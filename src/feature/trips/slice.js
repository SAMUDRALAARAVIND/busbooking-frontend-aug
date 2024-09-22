import { createSlice } from "@reduxjs/toolkit";

// TODO: write the logic as per the need
const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    tripsResponse: null,
    apiStatus: "init",
  },
  reducers: {
    updateTripsStatus: (state, action) => {
      // { success, data }
      state.apiStatus = action.payload.status;
      if (action.payload.status === "success") {
        state.tripsResponse = action.payload.data;
      }
    },
  },
});

export const { updateTripsStatus } = tripsSlice.actions;

export default tripsSlice;
