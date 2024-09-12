import React from "react";
import TripsSlice from "../Components/Trip.js";
import Filters from "../Components/features/Filters.js";
function TripPage() {
  return (
    <div style={{ border: "solid", height: "100vh" }}>
      <Filters />
      <TripsSlice />
      <TripsSlice />
    </div>
  );
}

export default TripPage;
