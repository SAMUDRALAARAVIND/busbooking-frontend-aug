import { useDispatch, useSelector } from "react-redux";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsList from "./components/TripsList";
import { allTripsSelector, tripsStatusSelector } from "./redux/selectors";
import { useEffect } from "react";
import { fetchTripsList } from "./redux/thunk";
import { useParams } from "react-router-dom";
import Spinner from "../../utlis/Spiner";
import { clearSelectedSeat } from "./redux/slice";

const TripsScreen = () => {
  const { sourceCityId, destinationCityId, travelDate } = useParams();
  const allTrips = useSelector(allTripsSelector);
  const dispatch = useDispatch();
  const apiStatus = useSelector(tripsStatusSelector);

  useEffect(() => {
    dispatch(fetchTripsList({ sourceCityId, destinationCityId, travelDate }));
    return () => {
      dispatch(clearSelectedSeat());
    };
  }, []);

  if (apiStatus === "init" || apiStatus === "pending") {
    return <Spinner />;
  }

  if (apiStatus === "error") {
    return <h2>Error occured while fetching trips</h2>;
  }

  if (!allTrips.length) {
    return <h2> No trips Available for this Date </h2>;
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
