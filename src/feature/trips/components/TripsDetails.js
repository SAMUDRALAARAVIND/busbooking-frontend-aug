import React, { useState, useEffect } from "react";

import { svg, aminitiesSvg } from "./svg";
import { DroppingBoardingPoint, Aminities } from "./modals";
import { DownOutlined } from "@ant-design/icons";

export const TripDetails = ({ trip }) => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const closeModals = () => {
      setActiveModal(null);
    };
    window.addEventListener("click", closeModals);
    return () => {
      window.removeEventListener("click", closeModals);
    };
  }, []);

  return (
    <>
      <TripRecord {...{ setActiveModal }} trip={trip} />
      <MoreDetails {...{ setActiveModal }} trip={trip} />

      {/* Conditional rendering of modals */}
      {activeModal === "boardingDroppingPoints" && (
        <DroppingBoardingPoint trip={trip} />
      )}
      {activeModal === "aminities" && <Aminities trip={trip} />}
    </>
  );
};

export const MoreDetails = ({ setActiveModal, trip }) => {
  const handleToggle = (e, modalName) => {
    e.stopPropagation();
    setActiveModal((prevModal) => (prevModal === modalName ? null : modalName));
  };

  return (
    <div className="moreDetails flex">
      <div
        className="flex"
        onClick={(e) => handleToggle(e, "boardingDroppingPoints")}
      >
        <p className="grey">Boarding & Dropping Points</p>
        <p>
          <DownOutlined
            className="downArrow grey"
            style={{ marginTop: "0px" }}
          />
        </p>
      </div>

      <div className="straightLine"></div>

      <div onClick={(e) => handleToggle(e, "aminities")} className="flex">
        <p className="grey">Amenities</p>
        <p>
          <DownOutlined
            className="downArrow grey"
            style={{ marginTop: "0px" }}
          />
        </p>
      </div>

      <div className="straightLine"></div>
    </div>
  );
};

export const TripRecord = ({ setActiveModal, trip }) => {
  return (
    <div className="tripRecords flex">
      <div
        className="aminities flex"
        onClick={(e) => {
          e.stopPropagation();
          setActiveModal((prevModal) =>
            prevModal === "aminities" ? null : "aminities"
          );
        }}
      >
        {trip.amenities.slice(0, 3).map((item, index) => {
          const matchedAmenity = aminitiesSvg.find((amenity) => {
            return amenity.name === item;
          });

          return matchedAmenity ? (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: matchedAmenity.img }}
            />
          ) : (
            <span key={index}>{item}</span>
          );
        })}

        {trip.amenities.length > 3 && (
          <span className="aminitiesLength">
            +{trip.amenities.slice(3).length}
          </span>
        )}
      </div>
      <div className="tracking flex">
        <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
        <p className="" style={{ color: "#444444" }}>
          Live Tracking
        </p>
      </div>
    </div>
  );
};
