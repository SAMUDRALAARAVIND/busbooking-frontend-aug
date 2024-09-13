import Filters from "../filters";
import "./trip.scss";

const TripsScreen = () => {
  return (
    <div className="tripmain">
      <Filters />
      <p>This is the trips screen where user can find all trips</p>
    </div>
  );
};

export default TripsScreen;
