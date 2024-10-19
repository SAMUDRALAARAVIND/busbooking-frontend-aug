import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../feature/search/slice";
import filtersSlice from "../feature/filters/slice";
import bookingSlice from "../feature/booking/slice";
import tripsSlice from "../feature/trips/redux/slice";
import { enableMapSet } from "immer";

enableMapSet();

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    filters: filtersSlice.reducer,
    booking: bookingSlice.reducer,
    trips: tripsSlice.reducer,
  },
});

export default store;
