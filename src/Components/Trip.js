import React, { useState, useEffect } from "react";
import "./Styles/Trip.scss";
import { svg, aminities } from "./svg";
import BoardingDropping from "./modal/droppingBoardingPoint";
import tagImg from "../asssests/tagImg.jpg";
import { DownOutlined } from "@ant-design/icons";
import { tripsData } from "./data"; // assuming tripsData is imported

export default function Trip() {
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

          <div className="verticalline "></div>
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

// Utility functions to format time and date
const formatDate = (epochTime) => {
  const date = new Date(epochTime * 1000);
  return date.toLocaleDateString("en-GB");
};

const formatTime = (epochTime) => {
  const date = new Date(epochTime * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const calculateDuration = (departureTime, arrivalTime) => {
  const durationMs = (arrivalTime - departureTime) * 1000;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// The TripDetails component, for amenities and other details
const TripDetails = ({ trip }) => {
  const [toggleAminities, setToggleAminities] = useState(false);
  const [boardingDroppingPoints, setBoardingDroppingPoints] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => {
      setToggleAminities(false);
      setBoardingDroppingPoints(false);
    });
  }, []);

  return (
    <>
      <TripRecord
        {...{ setToggleAminities, setBoardingDroppingPoints }}
        trip={trip}
      />
      <MoreDetails
        {...{ setToggleAminities, setBoardingDroppingPoints }}
        trip={trip}
      />
      {boardingDroppingPoints && <BoardingDropping />}
      {toggleAminities && <Aminities />}
    </>
  );
};

const TripRecord = ({ setToggleAminities, setBoardingDroppingPoints, trip }) => {
  return (
    <div className="tripRecords flex">
      <div className="rating flex">
        <div className="avgRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.ratingSvg }} />
          <p>{trip.averageRating}</p>
        </div>
        <div className="totalRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.usersRating }} />
          <p className="grey">{trip.numberOfRatings} ratings</p>
        </div>
      </div>

      <div className="aminities flex">
        {trip.amenities.slice(0, 3).map((item, index) => (
          <span key={index}>{item}</span>
        ))}

        {trip.amenities.length > 3 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setToggleAminities((prev) => !prev);
              setBoardingDroppingPoints(false);
            }}
            className="aminitiesLength "
          >
            +{trip.amenities.slice(3).length}
          </span>
        )}
      </div>

      <div className="tracking flex">
        <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
        <p>Live Tracking</p>
      </div>
    </div>
  );
};

const MoreDetails = ({ setBoardingDroppingPoints, setToggleAminities, trip }) => {
  return (
    <div className="moreDetails flex">
      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          setBoardingDroppingPoints((prev) => !prev);
          setToggleAminities(false);
        }}
      >
        <p className="grey">Boarding & Dropping Points </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
      </div>

      <div className="verticalline"> </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setToggleAminities((prev) => !prev);
          setBoardingDroppingPoints(false);
        }}
        className="flex"
      >
        <p className="grey">Amenities </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
      </div>

      <div className="verticalline"> </div>

      <br className="grey" />

      <div className="flex">
        <p className="grey">Cancellation Policy </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
      </div>
    </div>
  );
};


const Aminities = () => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", zIndex: "10" }}
        className="aminitesModal"
      >
        <h5>Aminities</h5>
        <div>
          {aminities.map((item, index) => (
            <p className="">
              <span
                dangerouslySetInnerHTML={{
                  __html: item.img.replace(
                    /stroke="[^"]*"/g,
                    'stroke="#444444"'
                  ),
                }}
              />
              <span dangerouslySetInnerHTML={{ __html: item.name }} />
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
