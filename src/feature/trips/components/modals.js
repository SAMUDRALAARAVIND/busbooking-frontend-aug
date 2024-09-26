import React from 'react'
import "../styles/modals.scss";
import { aminitiesSvg } from "./svg";
import { tripsSelector } from "../redux/selectors";
import { useSelector } from 'react-redux';

export function DroppingBoardingPoint ({ trip }) {

  const tripsList = useSelector(tripsSelector);
  console.log("boarding123", tripsList.mainDroppingPoints)

  // filtering boarding and dropping pints from trips selector
  const filteredBoardingPoints = tripsList.mainBoardingPoints.filter((mainPoint) =>
    trip.boardingPoints.some((stopPoint) => stopPoint.stopId === mainPoint.stopId)
  );
  const filteredDroppingPoints = tripsList.mainDroppingPoints.filter((mainPoint) =>
    trip.droppingPoints.some((stopPoint) => stopPoint.stopId === mainPoint.stopId)
  );

  return (
    <div className="bdContainer flex">
      <div className="left">
        <h5>Boarding Points</h5>
        <div className="boardingList overflow">
          {filteredBoardingPoints.map((data) => {
            return (
              <div>
                <h6>{data.title}</h6>
                <p className="grey">{data.directions}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="  right">
        <h5 className="">Dropping Points</h5>

        <div className=" DroppingList overflow ">
          {filteredDroppingPoints.map((data) => {
            return (
              <div>
                <h6>{data.title}</h6>
                <p className="grey">
                  <span>{data.directions} </span>
                </p>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
};


export const Aminities = ({trip}) => {
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
          console.log("match", matchedAmenity);

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
            <span dangerouslySetInnerHTML={{ __html: matchedAmenity.name }} />
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