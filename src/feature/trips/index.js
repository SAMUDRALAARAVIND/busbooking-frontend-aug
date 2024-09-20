import { useDispatch, useSelector } from "react-redux";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsList from "./components/TripsList";
import { tripsStatusSelector } from "./selectors";
import { useEffect } from "react";
import { fetchTripsList } from "./thunk";
import { useParams } from "react-router-dom";

const TripsScreen = () => {
  const { sourceId, destinationId, date } = useParams();

  const dispatch = useDispatch();
  const apiStatus = useSelector(tripsStatusSelector);

  useEffect(() => {
    dispatch(fetchTripsList({ sourceId, destinationId, date }));
  }, []);

  if (apiStatus === "init" || apiStatus === "pending") {
    return <h1>Loading trips ..</h1>;
  }

  if (apiStatus === "error") {
    return <h2>Error occured while fetching trips</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="trips-screen flex">
        <Filters />
        <TripsList />
      </div>
    </>
  );
};

export default TripsScreen;
