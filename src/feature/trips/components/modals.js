import React from "react";
import "../styles/modals.scss";
import { aminitiesSvg } from "./svg";
import { tripsSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);



function convertToIST(arrivalTime) {
  const date = new Date(arrivalTime*1000);
  return date.toLocaleString("en-IN", {
    hour12: false, 
    hour: "2-digit",
    minute: "2-digit",
  });
}


export function DroppingBoardingPoint({ trip }) {
  const tripsList = useSelector(tripsSelector);
  console.log("treeep", trip);

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
               const findArrivaltime = trip.boardingPoints.find(
                (stopPoint) => stopPoint.stopId === data.stopId
              );
              const arrivalTime = findArrivaltime
                ? convertToIST(findArrivaltime.arrivalTime)
                : "N/A";
            return (
              <div>
                {data.title.length > 17 ? (
                  <h6>{data.title.slice(0, 17) + "..."}</h6>
                ) : (
                  <h6>{data.title}</h6>
                )}
                {data.directions.length > 35 ? (
                  <p>{arrivalTime} :  {data.directions.slice(0, 35) + "..."}</p>
                ) : (
                  <p>{arrivalTime} : {data.directions}</p>
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

             const findArrivaltime = trip.droppingPoints.find(
              (stopPoint) => stopPoint.stopId === data.stopId
            );
            const arrivalTime = findArrivaltime
              ? convertToIST(findArrivaltime.arrivalTime)
              : "N/A";
            return (
              <div>
                <h6>
                  {data.title.length > 16 ? (
                    <h6>{data.title.slice(0, 16) + ".."} </h6>
                  ) : (
                    <h6>{data.title}</h6>
                  )}
                </h6>
                <p className="grey">
                  {data.directions.length > 25 ? (
                    <>
                      <p>{arrivalTime} :  {data.directions.slice(0, 25) + ".."}</p>
                    </>
                  
                  ) : (
                    <p>{arrivalTime} :  {data.directions}</p>
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
        <h6>Aminities</h6>
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
