import React from "react";
import { filterType, toggleStop } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { departureTimes } from "../enum";

const DepartureTime = () => {
  const dispatch = useDispatch();

  // Fetch the selected state for each departure time
  const departureTimeState = useSelector(
    (state) => state.filters[filterType.DEPARTURE_TIME]
  );

  const updateDepartureTime = (add, value) => {
    dispatch(
      toggleStop({
        add,
        stopId: value,
        identifier: filterType.DEPARTURE_TIME,
      })
    );
  };

  return (
    <div className="section">
      <span className="title">Departure Time</span>
      <div className="boxes">
        {departureTimes.map((time) => (
          <div className="box" key={time.identifier}>
            <input
              type="checkbox"
              id={time.identifier}
              className="select-box"
              checked={departureTimeState[time.identifier] || false} // Check dynamically
              onChange={(e) => {
                updateDepartureTime(e.target.checked, time.identifier);
              }}
            />
            <label htmlFor={time.identifier}>
              {time.icon} {/* Correct reference for icon */}
              <span>{time.title}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartureTime;
