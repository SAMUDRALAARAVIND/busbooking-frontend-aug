import { useDispatch, useSelector } from "react-redux";
import Filters from "../filters";
import Navbar from "../search/Navbar";
import TripsList from "./components/TripsList";
import { tripsStatusSelector } from "./redux/selectors";
import { useEffect } from "react";
import { fetchTripsList } from "./redux/thunk";
import { useParams } from "react-router-dom";
import { tripsSelector } from "./redux/selectors";
import Spinner from "../../utlis/Spiner";

const TripsScreen = () => {
  const { sourceCityId, destinationCityId, travelDate } = useParams();
  const tripsList = useSelector(tripsSelector);
  const dispatch = useDispatch();
  const apiStatus = useSelector(tripsStatusSelector);

  useEffect(() => {
    dispatch(fetchTripsList({ sourceCityId, destinationCityId, travelDate  }));
  }, []);

  if (apiStatus === "init" || apiStatus === "pending") {
    return <Spinner />;
  }

  if (apiStatus === "error") {
    return <h2>Error occured while fetching trips</h2>;
  }
console.log("tripsList", tripsList)
  if(tripsList?.filteredTrips?.length <= 0){
    return <h2> No trips Available for this Date </h2>
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
