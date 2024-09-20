import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { departureTime, filterType, toggleStop } from "../slice";
import { useDispatch, useSelector } from "react-redux";

const departureTimes = [
  {
    title: "Before 10AM",
    identifier: departureTime.MORNING,
    icon: <WbSunnyIcon />,
  },
  {
    title: "10AM - 5PM",
    identifier: departureTime.AFTERNOON,
    icon: <Brightness6Icon />,
  },
  {
    title: "5PM - 11PM",
    identifier: departureTime.EVENING,
    icon: <WbSunnyIcon />,
  },
  {
    title: "After 11PM",
    identifier: departureTime.NIGHT,
    icon: <NightsStayIcon />,
  },
];

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
