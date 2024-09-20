import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import AirIcon from "@mui/icons-material/Air";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import FilterListIcon from "@mui/icons-material/FilterList";
import { filterType, toggleStop, departureTime } from "./slice";
import "./style/Footer.scss";

const busTypes = [
  {
    title: "AC",
    identifier: "AC",
    icon: <AcUnitIcon />,
  },
  {
    title: "Non AC",
    identifier: "NON_AC",
    icon: <AirIcon />,
  },
  {
    title: "Seater",
    identifier: "SEATER",
    icon: <EventSeatIcon />,
  },
  {
    title: "Sleeper",
    identifier: "SLEEPER",
    icon: <AirlineSeatFlatIcon />,
  },
];

const time = [
  {
    title: "Morning",
    identifier: departureTime.MORNING,
    icon: <Brightness6Icon />,
  },
  {
    title: "Night",
    identifier: departureTime.NIGHT,
    icon: <NightsStayIcon />,
  },
];

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const busTypesState = useSelector(
    (state) => state.filters[filterType.BUS_TYPES]
  );
  const departureTimeState = useSelector(
    (state) => state.filters[filterType.DEPARTURE_TIME]
  );

  const updateBusTypeFilter = (add, value) => {
    dispatch(
      toggleStop({ identifier: filterType.BUS_TYPES, stopId: value, add })
    );
  };

  const updateDepartureTime = (add, value) => {
    dispatch(
      toggleStop({
        add,
        stopId: value,
        identifier: filterType.DEPARTURE_TIME,
      })
    );
  };

  const showToggleSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeToggleSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth > 992) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="res-nav">
        <Filters />
      </div>
      <div className="res-sidebar">
        <div className="amenities-list">
          {busTypes.map((item) => (
            <button
              key={item.identifier}
              className={`amenities-button ${
                departureTimeState[item.identifier] ? "selected" : ""
              }`}
              onClick={() =>
                updateBusTypeFilter(
                  !busTypesState[item.identifier],
                  item.identifier
                )
              }
            >
              {item.icon}
              <span className="amenities-val">{item.title}</span>
            </button>
          ))}
          {time.map((item) => (
            <button
              key={item.identifier}
              className={`amenities-button ${
                departureTimeState[item.identifier] ? "selected" : ""
              }`}
              onClick={() =>
                updateDepartureTime(
                  !departureTimeState[item.identifier],
                  item.identifier
                )
              }
            >
              {item.icon}
              <span className="amenities-val">{item.title}</span>
            </button>
          ))}
        </div>
        <div className="res-filter">
          <button className="filter-button" onClick={showToggleSidebar}>
            <FilterListIcon className="filter-icon" />
            <span className="filter-text">Sort & Filter</span>
          </button>
        </div>
        <Drawer
          title="Filters"
          placement="right"
          onClose={closeToggleSidebar}
          open={isSidebarOpen} // Use open instead of visible
          width={420}
          className="custom-drawer" // Use className instead of classNames
        >
          <Filters width={340} padding={20} />
          {/* <button className="nav-btn" onClick={handleClearAllFilters}>
            Reset
          </button> */}
        </Drawer>
      </div>
    </>
  );
};

export default SideBar;
