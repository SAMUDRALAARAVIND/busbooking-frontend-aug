import React, { useState, useEffect } from "react";
import "./styles/Trip.scss";
import { svg, aminitiesSvg } from "./svg";
import tagImg from "../../assets/tagImg.jpg";
import { DownOutlined } from "@ant-design/icons";
import { tripsData } from "../data"; 
import { CancellationModal, TravelPolicy, DroppingBoardingPoint, Aminities } from './modals'
import { formatDate, formatTime } from "./formatDatetime";


export default function TripsScreen() {
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
                  <h4>{trip.busPartner}</h4>
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
          <div className="straightLine "></div>
          <div className="rightWrapper">
            <div className="text-end">
              <p className="grey">Starting At</p>
              <span>₹ {trip.minPrice}</span>
            </div>
            <div className="text-end">
              <button className="showSeat">Show Seat</button>
              <p className="grey">{trip.availableSeats} Seats Available</p>
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


const formatRatings = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number;
};

const TripRecord = ({
  setToggleAminities,
  setBoardingDroppingPoints,
  setCancellationPolicy,
  setTravelPolicy,
  trip,
}) => {
  return (
    <div className="tripRecords flex">
      <div className="rating flex">
        <div className="avgRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.ratingSvg }} />
          <p>{trip.averageRating}</p>
        </div>
        <div className="totalRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.usersRating }} />
          <p className="grey">{formatRatings(trip.numberOfRatings)}</p>
        </div>
      </div>

      <div className="aminities flex">
        {trip.amenities.slice(0, 3).map((item, index) => {
          const matchedAmenity = aminitiesSvg.find((amenity) => {
            console.log("Checking against:", amenity.name); // Debug the amenity names
            return amenity.name === item;
          });
          console.log("match", matchedAmenity);

          return matchedAmenity ? (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: matchedAmenity.img }}
            />
          ) : (
            <span key={index}>{item}</span> // Fallback if no matching SVG is found
          );
        })}

        {trip.amenities.length > 3 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setToggleAminities((prev) => !prev);
              setBoardingDroppingPoints(false);
              setCancellationPolicy(false)
              setTravelPolicy(false)
            }}
            className="aminitiesLength "
          >
            +{trip.amenities.slice(3).length}
          </span>
        )}
      </div>

      <div className="tracking flex">
        <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
        <p className="" style={{color:"#444444"}}>Live Tracking</p>
      </div>
    </div>
  );
};

const MoreDetails = ({
  setBoardingDroppingPoints,
  setToggleAminities,
  setCancellationPolicy,
  setTravelPolicy,
  trip,
}) => {
  return (
    <div className="moreDetails flex">
      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          setBoardingDroppingPoints((prev) => !prev);
          setToggleAminities(false);
          setCancellationPolicy(false);
          setTravelPolicy(false)
        }}
      >
        <p className="grey">Boarding & Dropping Points</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}} />
        </p>
      </div>

      <div className="straightLine"></div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setToggleAminities((prev) => !prev);
          setBoardingDroppingPoints(false);
          setCancellationPolicy(false);
          setTravelPolicy(false)
        }}
        className="flex"
      >
        <p className="grey">Amenities</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
      <div className="straightLine"></div>

      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          setCancellationPolicy((prev) => !prev);
          setBoardingDroppingPoints(false);
          setToggleAminities(false);
          setTravelPolicy(false)
        }}
      >
        <p className="grey">Cancellation Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
      <div className="straightLine"></div>

      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          setTravelPolicy((prev) => !prev);
          setBoardingDroppingPoints(false);
          setToggleAminities(false);
          setCancellationPolicy(false)
        }}
      >
        <p className="grey">Travel Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
    </div>
  );
};

const TripDetails = ({ trip }) => {
  const [toggleAminities, setToggleAminities] = useState(false);
  const [boardingDroppingPoints, setBoardingDroppingPoints] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState(false);
  const [travelPolicy, setTravelPolicy] = useState(false);

  useEffect(() => {
    const closeModals = () => {
      setToggleAminities(false);
      setBoardingDroppingPoints(false);
      setCancellationPolicy(false);
      setTravelPolicy(false)
    };
  
    window.addEventListener("click", closeModals);
    return () => {
      window.removeEventListener("click", closeModals);  
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener("click", () => {
  //     setToggleAminities(false);
  //     setBoardingDroppingPoints(false);
  //     setCancellationPolicy(false);
  //     setTravelPolicy(false)
  //   });
  // }, []);
  

  return (
    <>
      <TripRecord
        {...{ setToggleAminities, setBoardingDroppingPoints, setCancellationPolicy, setTravelPolicy }}
        trip={trip}
      />
      <MoreDetails
        {...{ setToggleAminities, setBoardingDroppingPoints, setCancellationPolicy , setTravelPolicy}}
        trip={trip}
      />
      
      {/* Conditional rendering of modals */}
      {boardingDroppingPoints && <DroppingBoardingPoint />}
      {toggleAminities && <Aminities trip={trip}/>}
      {cancellationPolicy && <CancellationModal  trips={trip}/>}
      {travelPolicy && <TravelPolicy  />}
    </>
  );
};


