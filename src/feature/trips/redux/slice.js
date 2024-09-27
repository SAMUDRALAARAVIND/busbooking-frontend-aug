import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// TODO: write the logic as per the need

const MAX_SEATS = 6; //  constant for maximum seat limit

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    tripsResponse: null,
    apiStatus: "init",
    // seat Layout states
    allTripsSelectedSeatData: Cookies.get("selectedSeatData")
      ? [JSON.parse(Cookies.get("selectedSeatData"))]
      : [],
    selectedSeatData: {},
  },
  reducers: {
    updateTripsStatus: (state, action) => {
      // { success, data }
      state.apiStatus = action.payload.status;
      if (action.payload.status === "success") {
        state.tripsResponse = action.payload.data;
      }
    },
    setAllTripsSelectedSeatData: (state, action) => {
      const seat = action.payload.seat;
      const tripId = action.payload.tripId;
      const points = action.payload.points;

      state.allTripsSelectedSeatData = state.allTripsSelectedSeatData.map(
        (s) => {
          if (tripId === s.tripId) {
            let seatExists;
            if (s.seats && seat) {
              seatExists = s.seats.some(
                (s) => s.seatNumber === seat.seatNumber
              );
              if (seatExists) {
                s.seats = s.seats.filter(
                  (s) => s.seatNumber !== seat.seatNumber
                );
              } else if (s.seats.length < MAX_SEATS) s.seats.push(seat);
              else {
                window.alert("Sorry, Maximum 6 seats allowed per passenger");
              }
            } else if (seat) s.seats = [seat];
            s.points = points;
          }
          return s;
        }
      );
      // state.singleSeatData = state.seatData.find((s) => (s.tripId = tripId));
    },
    setSelectedSeatData: (state, action) => {
      state.selectedSeatData = action.payload;
    },
    setTripId: (state, action) => {
      const isExist = state.allTripsSelectedSeatData.some(
        (s) => s.tripId === action.payload
      );
      if (!isExist)
        state.allTripsSelectedSeatData.push({ tripId: action.payload });
    },
  },
});

export const {
  updateTripsStatus,
  setAllTripsSelectedSeatData,
  setSelectedSeatData,
  setTripId,
} = tripsSlice.actions;

export default tripsSlice;
