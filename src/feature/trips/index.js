import { useDispatch, useSelector } from "react-redux";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsList from "./components/TripsList";
import { tripsStatusSelector } from "./selectors";
import { useEffect } from "react";
import { fetchTripsList } from "./thunk";
import { useParams } from "react-router-dom";

import "./styles/main.scss"

const TripsScreen = () => {
  const { sourceId, destinationId, dateId } = useParams();

  console.log(sourceId, destinationId, dateId)

  const dispatch = useDispatch();
  const apiStatus = useSelector(tripsStatusSelector);

  useEffect(() => {
    dispatch(fetchTripsList({ sourceId, destinationId, dateId }));
  });

  if (apiStatus === "init" || apiStatus === "pending") {
    return <h1>Loading trips ..</h1>;
  }

  if (apiStatus === "error") {
    return <h2>Error occured while fetching trips</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="trips-screen">
        <Filters />
        <TripsList />
      </div>
    </>
  );
};

export default TripsScreen;
