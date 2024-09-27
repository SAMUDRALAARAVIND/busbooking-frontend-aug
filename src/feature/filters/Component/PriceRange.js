import { Slider } from "antd";
import { toggleUpdatedPriceRange } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import "../style/PriceRange.scss";

const PriceRange = () => {
  const dispatch = useDispatch();
  const { range, selectedRange } = useSelector(
    (state) => state.filters.priceRange
  );

  const onChangeRange = (value) => {
    dispatch(toggleUpdatedPriceRange(value));
  };

  return (
    <div className="section">
      <span className="title">Price Range</span>
      <div className="range-val">
        <span>{selectedRange[0]}</span>
        <span>{selectedRange[1]}</span>
      </div>
      <Slider
        className="custom-range"
        range
        min={range[0]}
        max={range[1]}
        value={selectedRange}
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
