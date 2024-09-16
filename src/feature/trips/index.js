import React from "react";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsCard from "./components/tripsCard";
const TripsScreen = () => {
  return (
    <>
      <Navbar />
      <div className="trips-screen flex">
        <Filters />
        <TripsCard />
      </div>
    </>
  );
};

export default TripsScreen;
