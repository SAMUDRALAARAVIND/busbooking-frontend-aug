import { useDispatch, useSelector } from "react-redux";
import Toggle from "./Component/Toggle";
import SearchItems from "./Component/SearchItem";
import BusTypes from "./Component/BusTypes";
import PriceRange from "./Component/PriceRange";
import DepartureTime from "./Component/DepartureTime";
import { clearAllFilters, filterType } from "./slice";
import {
  boardingDroppingPointsSelector,
  busPartnerSelector,
} from "./selectors";
import "./style/filter.scss";
import { Divider } from "antd";

const Filters = ({ width, padding }) => {
  const dispatch = useDispatch();
  const { boardingPoints, dropingPoints } = useSelector(
    boardingDroppingPointsSelector
  );
  const busPartners = useSelector(busPartnerSelector);

  const handleReset = () => {
    dispatch(clearAllFilters());
  };

  const sidebarStyle = {
    width: width || "300px",
    padding: padding || "20px",
  };

  return (
    <div className="filters-container" style={sidebarStyle}>
      <div className="header">
        <p className="subheading">Filters</p>
        <button className="clear_all_btn" onClick={handleReset}>
          Clear All
        </button>
      </div>
      <Divider style={{ margin: "0px 0px" }} />
      <BusTypes />
      <PriceRange />
      <DepartureTime />
      <Toggle className="section" title="Bus Partner">
        <SearchItems
          placeholder="Search Bus partner"
          list={[...busPartners].map((i) => ({ stopId: i, name: i }))}
          identifier={filterType.BUS_PARTNER}
        />
      </Toggle>
      <Toggle className="section" title="Boarding Points">
        <SearchItems
          placeholder="Search boarding points"
          list={[...boardingPoints].map((i) => ({
            stopId: i.stopId,
            name: i.title,
          }))}
          identifier={filterType.BOARDING_POINTS}
        />
      </Toggle>
      <Toggle className="section" title="Dropping Points">
        <SearchItems
          placeholder="Search dropping points"
          list={[...dropingPoints].map((i) => ({
            stopId: i.stopId,
            name: i.title,
          }))}
          identifier={filterType.DROPPING_POINTS}
        />
      </Toggle>
    </div>
  );
};

export default Filters;
