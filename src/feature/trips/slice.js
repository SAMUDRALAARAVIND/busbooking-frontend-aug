import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initialized the state with selected seats from cookies, if available
const initialState = {
  selectedSeats: Cookies.get("selectedSeats")
    ? JSON.parse(Cookies.get("selectedSeats"))
    : [],
  points: null,
};

const MAX_SEATS = 6; //  constant for maximum seat limit

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setSelectedSeats: (state, action) => {
      const seat = action.payload;
      const seatExists = state.selectedSeats.some(
        (s) => s.seatNumber === seat.seatNumber
      );

      if (seatExists) {
        // Remove the seat if it already exists in the selected seats
        state.selectedSeats = state.selectedSeats.filter(
          (s) => s.seatNumber !== seat.seatNumber
        );
      } else if (state.selectedSeats.length < MAX_SEATS) {
        // Add the seat if the limit is not exceeded
        state.selectedSeats.push(seat);
      } else {
        window.alert("Sorry, Maximum 6 seats allowed per passenger");
      }
    },

    setSelectedPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setSelectedSeats, setSelectedPoints } = tripsSlice.actions;

export default tripsSlice;
