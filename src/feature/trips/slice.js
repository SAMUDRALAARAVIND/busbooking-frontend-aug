import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initialized the state with selected seats from cookies, if available
const initialState = {
  seatData: Cookies.get("seatData")
    ? [JSON.parse(Cookies.get("seatData"))]
    : [],
  singleSeatData: {},
};

const MAX_SEATS = 6; //  constant for maximum seat limit

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setSeatData: (state, action) => {
      const seat = action.payload.seat;
      const tripId = action.payload.tripId;
      const points = action.payload.points;

      state.seatData = state.seatData.map((s) => {
        if (tripId === s.tripId) {
          let seatExists;
          if (s.seats && seat) {
            seatExists = s.seats.some((s) => s.seatNumber === seat.seatNumber);
            if (seatExists) {
              s.seats = s.seats.filter((s) => s.seatNumber !== seat.seatNumber);
            } else if (s.seats.length < MAX_SEATS) s.seats.push(seat);
            else {
              window.alert("Sorry, Maximum 6 seats allowed per passenger");
            }
          } else if (seat) s.seats = [seat];
          s.points = points;
        }
        return s;
      });
      // state.singleSeatData = state.seatData.find((s) => (s.tripId = tripId));
    },
    setSingleSeatData: (state, action) => {
      state.singleSeatData = action.payload;
    },
    setTripId: (state, action) => {
      const isExist = state.seatData.some((s) => s.tripId === action.payload);
      if (!isExist) state.seatData.push({ tripId: action.payload });
    },
  },
});

export const { setSeatData, setSingleSeatData, setTripId } = tripsSlice.actions;

export default tripsSlice;
