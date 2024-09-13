import Toggle from "./Component/Toggle";
import SearchItems from "./Component/SearchItem";
import BusTypes from "./Component/BusTypes";
import PriceRange from "./Component/PriceRange";
import DepartureTime from "./Component/DepartureTime";
import { filterType } from "./slice";
import { busPartners, cities } from "./data";
import "./style/filter.scss";

const Filters = ({ width, padding }) => {
  const sidebarStyle = {
    width: width || "300px",
    padding: padding || "20px",
  };
  return (
    <div className="filters-container" style={sidebarStyle}>
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
          list={[...cities].map((i) => ({ stopId: i, name: i }))}
          identifier={filterType.BUS_PARTNER}
        />
      </Toggle>
      <Toggle className="section" title="Dropping Points">
        <SearchItems
          placeholder="Search dropping points"
          list={[...cities].map((i) => ({ stopId: i, name: i }))}
          identifier={filterType.BUS_PARTNER}
        />
      </Toggle>
    </div>
  );
};

export default Filters;
