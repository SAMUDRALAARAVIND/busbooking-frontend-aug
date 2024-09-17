import { Checkbox, Empty, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleStop } from "../slice";
import "../style/Search.scss";

const SearchItems = ({ list, placeholder, identifier }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStops, setSelectedStops] = useState({}); // Local state for selected items
  const dispatch = useDispatch();

  const filteredItems = list.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const onCheckInput = (stopId, add) => {
    const updatedSelectedStops = { ...selectedStops, [stopId]: add };
    setSelectedStops(updatedSelectedStops);
    dispatch(toggleStop({ add, stopId, identifier }));
  };

  return (
    <div className="search-box">
      {/* <span className="selected-items">
        {Object.keys(selectedStops).length} items selected
      </span> */}
      <Input
        className="search-input"
        suffix={<span className="material-icons custom-icon">search</span>}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="items">
        {filteredItems.length === 0 ? (
          <Empty description="No data found" />
        ) : (
          filteredItems.map((item) => {
            return (
              <div key={item.stopId} className="search-item">
                <Checkbox
                  className="custom-checkbox"
                  checked={selectedStops[item.stopId] || false}
                  id={item.stopId}
                  onChange={(e) => onCheckInput(item.stopId, e.target.checked)}
                />
                <label htmlFor={item.stopId}>{item.name}</label>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchItems;
