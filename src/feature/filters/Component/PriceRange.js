import { Slider } from "antd";
import { toggleUpdatedPriceRange } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { getPriceRange } from "../selectors";
import "../style/PriceRange.scss";

const PriceRange = () => {
  // const { range, selectedRange } = useSelector(getPriceRange);
  const dispatch = useDispatch();
  // const [localRange, setLocalRange] = useState(selectedRange);

  // useEffect(() => {
  //   setLocalRange(selectedRange);
  // }, [selectedRange]);
  const { range, selectedRange } = useSelector(getPriceRange);
  console.log("price", range);
  console.log("sell", selectedRange);

  const onChangeRange = (value) => {
    // setLocalRange(value);
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
        // defaultValue={[selectedRange[0], selectedRange[1]]}
        value={selectedRange}
        // defaultValue={localRange}
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
