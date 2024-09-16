import "../styles/TripCard.scss";
import tagImg from "../../../assets/tagImg.jpg";
import { tripsData } from "../../data"; 
import { formatDate, formatTime } from "./formatDatetime";
import { TripDetails } from "./TripsDetails";

export default function TripsCard() {
  return (
    <div className="trips container">
      {tripsData[0].trips.map((trip, index) => (
        <div key={trip.tripId} className="TripContainer">
          <div className="leftWrapper">
            <div className="upperItems">
              <div className="ads absolute">
                <p>AD</p>
              </div>
              <img src={tagImg} className="tagImg" alt="abhiAssuaranceTag" />

              <div className="flex tripInfo">
                <div className="NameAndType">
                  <h5>{trip.busPartner}</h5>
                  <p className="grey">{trip.busType}</p>
                </div>
                <div className="timeInfo flex">
                  <div className="departureData">
                    <p className="grey">{formatDate(trip.departureTime)}</p>
                    <span>{formatTime(trip.departureTime)}</span>
                    <p className="grey">{tripsData[0].sourceCity.name}</p>
                  </div>
                  <div className="duration flex grey">
                    - - -<p>{calculateDuration(trip.departureTime, trip.arrivalTime)}</p>- - -
                  </div>
                  <div className="arrivalData">
                    <p className="grey">{formatDate(trip.arrivalTime)}</p>
                    <span>{formatTime(trip.arrivalTime)}</span>
                    <p className="grey">{tripsData[0].destinationCity.name}</p>
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
              <button className="showSeat">Show Seat</button>
              <p className="grey seats-available">{trip.availableSeats} Seats Available</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

//  Total Duration
const calculateDuration = (departureTime, arrivalTime) => {
  const durationMs = (arrivalTime - departureTime) * 1000; 
  const totalMinutes = Math.floor(durationMs / (1000 * 60)); 
  const hours = Math.floor(totalMinutes / 60); 
  const minutes = totalMinutes % 60; 

  // Format hours and minutes
  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, '0'); 

  return `${formattedHours}.${formattedMinutes} Hrs`;
};