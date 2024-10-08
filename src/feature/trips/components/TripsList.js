import { useEffect, useRef, useState } from "react";
import "../styles/TripList.scss";
import tagImg from "../assets/tagImg.jpg";

import { formatDate, formatTime } from "./formatDatetime";
import { TripDetails } from "./TripsDetails";
import { useSelector } from "react-redux";
import { tripsSelector } from "../redux/selectors";
import { useParams } from "react-router-dom";
import SeatLayout from "../seatLayout/SeatLayout.js";
import { message } from "antd";

export default function TripsList() {
  const tripsList = useSelector(tripsSelector);
  const { source, destination, travelDate } = useParams();
  console.log("tripsList", tripsList);

  useEffect(() => {
    if (tripsList.isFilteredEmpty) {
      message.error("No data is available for the selected filters.");
    }
  }, [tripsList.isFilteredEmpty]);
  
  return (
    <div className="trips container ">
     
      {!tripsList.isFilteredEmpty ? tripsList?.filteredTrips?.map((trip, index) => (
          <SingleTrip key={trip.tripId} {...{ trip, source, destination }} />
        )) : 
        <div className="notification">
          <h3><b>No Data Is Available For this Selected Filter</b></h3>
          </div>}
     
    </div>
  );
}

const SingleTrip = (props) => {
  const { trip, source, destination } = props;
  const [showSeat, setShowSeat] = useState(false);
  const styles = { textAlign: "left", margin: "17px", maxWidth: "66vw" };
  const tripRef = useRef(null);

  return (
    <>
      <div ref={tripRef} key={trip.tripId} className="tripsList">
        <div className="TripContainer">
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
            <TripDetails trip={trip} />
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
      </div>
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
