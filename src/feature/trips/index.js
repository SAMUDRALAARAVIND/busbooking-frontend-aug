import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsCard from "./components/tripsCard";

import "./styles/main.scss"

const TripsScreen = () => {
  return (
    <>
      <Navbar />
      <div className="trips-screen">
        <Filters />
        <TripsCard />
      </div>
    </>
  );
};

export default TripsScreen;
