import React from "react";
import "../styles/modals.scss";
import { aminitiesSvg } from "./svg";
import { tripsSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

export function DroppingBoardingPoint({ trip }) {
  const tripsList = useSelector(tripsSelector);
  console.log("boarding123", tripsList.mainDroppingPoints);

  // filtering boarding and dropping pints from trips selector
  const filteredBoardingPoints = tripsList.mainBoardingPoints.filter(
    (mainPoint) =>
      trip.boardingPoints.some(
        (stopPoint) => stopPoint.stopId === mainPoint.stopId
      )
  );
  const filteredDroppingPoints = tripsList.mainDroppingPoints.filter(
    (mainPoint) =>
      trip.droppingPoints.some(
        (stopPoint) => stopPoint.stopId === mainPoint.stopId
      )
  );

  return (
    <div className="bdContainer flex">
      <div className="left">
        <h5>Boarding Points</h5>
        <div className="boardingList overflow">
          {filteredBoardingPoints.map((data) => {
            return (
              <div>
                {data.title.length > 17 ? (
                  <h6>{data.title.slice(0, 17) + "..."}</h6>
                ) : (
                  <h6>{data.title}</h6>
                )}
                {data.directions.length > 65 ? (
                  <p>{data.directions.slice(0, 65) + "..."}</p>
                ) : (
                  <p>{data.directions}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="  right">
        <h5 className="">Dropping Points</h5>

        <div className="DroppingList overflow">
          {filteredDroppingPoints.map((data) => {
            return (
              <div>
                <h6>
                  {data.title.length > 18 ? (
                    <h6>{data.title.slice(0, 18) + ".."} </h6>
                  ) : (
                    <h6>{data.title}</h6>
                  )}
                </h6>
                <p className="grey">
                  {data.directions.length > 55 ? (
                    <p>{data.directions.slice(0, 55) + "..."}</p>
                  ) : (
                    <p>{data.directions}</p>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
}

export const Aminities = ({ trip }) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", zIndex: "10" }}
        className="aminitesModal"
      >
        <h5>Aminities</h5>
        <div>
          {trip.amenities.map((item, index) => {
            const matchedAmenity = aminitiesSvg.find((amenity) => {
              return amenity.name === item;
            });

            return matchedAmenity ? (
              <p className="">
                <span
                  dangerouslySetInnerHTML={{
                    __html: matchedAmenity.img.replace(
                      /stroke="[^"]*"/g,
                      'stroke="#444444"'
                    ),
                  }}
                />
                <span
                  dangerouslySetInnerHTML={{ __html: matchedAmenity.name }}
                />
              </p>
            ) : (
              <span key={index}>{item}</span>
            );
          })}
        </div>
      </div>
    </>
  );
};
