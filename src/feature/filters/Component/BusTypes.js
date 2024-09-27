import { useDispatch, useSelector } from "react-redux";
import { filterType, toggleStop } from "../slice";
import { busTypes } from "../enum";
import "../style/BusTypes.scss";

const BusTypes = () => {
  const dispatch = useDispatch();

  const busTypesState = useSelector(
    (state) => state.filters[filterType.BUS_TYPES]
  );

  const updateBusTypeFilter = (add, value) => {
    dispatch(
      toggleStop({ identifier: filterType.BUS_TYPES, stopId: value, add })
    );
  };

  return (
    <div className="section">
      <span className="title">Bus Types</span>
      <div className="busType_boxes">
        {busTypes.map((busType) => (
          <div className="box" key={busType.identifier}>
            <input
              type="checkbox"
              id={busType.identifier}
              className="select-box"
              checked={busTypesState[busType.identifier] || false} // Check dynamically
              onChange={(e) => {
                updateBusTypeFilter(e.target.checked, busType.identifier);
              }}
            />
            <label htmlFor={busType.identifier}>
              {busType.icon}
              <span>{busType.title}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusTypes;
