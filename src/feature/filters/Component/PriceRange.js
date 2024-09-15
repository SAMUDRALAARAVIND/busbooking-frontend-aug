import { useState } from "react";
import { Slider } from "antd";
import { toggleUpdatedPriceRange } from "../slice";
import { priceRangeSelector } from "../data";
import { useDispatch } from "react-redux";
import "../style/PriceRange.scss";

const PriceRange = () => {
  const { range, selectedRange } = priceRangeSelector();
  const [localRange, setLocalRange] = useState(selectedRange);
  const dispatch = useDispatch();
  const onChangeRange = (value) => {
    setLocalRange(value);
    dispatch(toggleUpdatedPriceRange(value));
  };
  return (
    <div className="section">
      <span className="title">Price Range</span>
      <div className="range-val">
        <span>{localRange[0]}</span>
        <span>{localRange[1]}</span>
      </div>
      <Slider
        className="custom-range"
        range
        min={range[0]}
        max={range[1]}
        defaultValue={[selectedRange[0], selectedRange[1]]}
        onChange={onChangeRange}
      />
      <div className="range-val">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
    </div>
  );
};

export default PriceRange;
