import React from "react";
import TripsSlice from "../Components/Trip.js";
import Filters from "../Components/features/Filters.js";
function TripPage() {
  return (
    <div className="trips-page flex">
      <Filters />
      <div className="">
      <TripsSlice />
      </div>
     
    </div>
  );
}

export default TripPage;
