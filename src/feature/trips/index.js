import React from "react";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsCard from "./components/tripsCard";
 
import '../search/styles/Header.scss'



import './styles/main.scss'
import Searchinput from "./Searchinput";





const TripsScreen = () => {
  return (
    <>
      <Navbar />
      <div className="search_bar">
        <Searchinput />
      </div>
      <div className="trips-screen flex">
        <Filters />
        <TripsCard />
      </div>
    </>
  );
};

export default TripsScreen;
