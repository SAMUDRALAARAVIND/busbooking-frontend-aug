import React from "react";
import "../Styles/modals.scss";
import { boardingPoints, droppingPoints } from "../data";
const droppingBoardingPoint = () => {
  return (
    <div className="bdContainer flex">
      <div className="left">
        <h5>Boarding Points</h5>
        <div className="boardingList overflow">
          {boardingPoints.map((data) => {
            return (
              <div>
                <h6>{data.name}</h6>
                <p className="grey">{data.address}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="  right">
        <h5 className="">Dropping Points</h5>
        <div className=" DroppingList overflow ">
          {droppingPoints.map((data) => {
            return (
              <div>
                <h6>{data.name}</h6>
                <p className="grey">
                  <span>{data.date} </span>
                  <span> {data.time}</span>
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

export default droppingBoardingPoint;
