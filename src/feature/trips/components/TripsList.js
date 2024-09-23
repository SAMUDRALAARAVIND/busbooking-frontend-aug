import "../styles/TripList.scss";
import tagImg from "../assets/tagImg.jpg";

import { formatDate, formatTime } from "./formatDatetime";
import { TripDetails } from "./TripsDetails";
import { useSelector } from "react-redux";
import { tripsSelector } from "../redux/selectors";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SeatLayout from "../seatLayout/SeatLayout.js";

export default function TripsList() {
  // get the tripsList from redux store
  const tripsList = useSelector(tripsSelector);
  const { source, destination, travelDate } = useParams();

  const [activeTripId, setActiveTripId] = useState(null);

  const handleModalToggle = (tripId) => {
    setActiveTripId((prevId) => (prevId === tripId ? null : tripId));
  };

  console.log("tripsList", tripsList);
  return (
    <div className="trips container ">
      {tripsList?.map((trip, index) => (
        <SingleTrip
          key={trip.tripId}
          {...{ trip, source, destination, activeTripId, handleModalToggle }}
        />
      ))}
    </div>
  );
}

const SingleTrip = (props) => {
  const { trip, source, destination, activeTripId, handleModalToggle } = props;
  const [showSeat, setShowSeat] = useState(false);
  const styles = { textAlign: "left", margin: "17px", maxWidth: "66vw" };
  return (
    <>
      <div key={trip.tripId} className="TripContainer">
        <div className="leftWrapper">
          <div className="upperItems">
            <div className="flex tripInfo">
              <div className="NameAndType">
                <h5>{trip.busPartner}</h5>
                <p className="grey">{trip.busType}</p>
              </div>
              <div className="timeInfo flex">
                <div className="departureData">
                  <p className="grey">{formatDate(trip.departureTime)}</p>
                  <span>{formatTime(trip.departureTime)}</span>
                  <p className="grey">{source}</p>
                </div>
                <div className="duration flex grey">
                  - - -
                  <p>
                    {calculateDuration(trip.departureTime, trip.arrivalTime)}
                  </p>
                  - - -
                </div>
                <div className="arrivalData">
                  <p className="grey">{formatDate(trip.arrivalTime)}</p>
                  <span>{formatTime(trip.arrivalTime)}</span>
                  <p className="grey">{destination}</p>
                </div>
              </div>
            </div>
          </div>
          <TripDetails
            trip={trip}
            activeTripId={activeTripId}
            handleModalToggle={() => handleModalToggle(trip.tripId)}
          />
        </div>
        <div className="rightWrapper">
          <div className="text-end">
            <p className="grey">Starting At</p>
            <span>₹ {trip.minPrice}</span>
          </div>
          <div className="text-end">
            <button
              onClick={() => setShowSeat((prev) => !prev)}
              className="showSeat"
            >
              Show Seat
            </button>
            <p className="grey seats-available">
              {trip.availableSeats} Seats Available
            </p>
          </div>
        </div>
      </div>
      {showSeat && <SeatLayout trip={trip} />}
    </>
  );
};

//  Total Duration
const calculateDuration = (departureTime, arrivalTime) => {
  const durationMs = (arrivalTime - departureTime) * 1000;
  const totalMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format hours and minutes
  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}.${formattedMinutes} Hrs`;
};
