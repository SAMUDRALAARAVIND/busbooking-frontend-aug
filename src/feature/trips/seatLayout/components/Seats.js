import { useMemo } from "react";
import styles from "../styles/seats-styles.module.scss";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAllSelectedSeat } from "../../redux/slice";
import { useTripContext } from "../SeatLayout";

const getSeats = (seats) => {
  const formattedSeats = [];

  // Construct a 2D array and format seat data
  for (const seat of seats) {
    const { row, column, price, gender } = seat;
    const seatPrice = !gender ? price : 0;

    if (!formattedSeats[row - 1]) formattedSeats[row - 1] = [];

    formattedSeats[row - 1][column - 1] = { ...seat, price: seatPrice };
  }

  // Handle empty seats and add empty row
  formattedSeats.forEach((seatRow) => {
    for (let i = 0; i < seatRow.length; i++) {
      if (!seatRow[i]) {
        seatRow[i] = { seatNumber: "", gender: null, price: "" };
      }
    }
  });

  const emptySeats = [[{ seatNumber: "", gender: null, price: "" }]];
  // emptySeats[1] = [{ seatNumber: "", gender: null, price: "" }];

  formattedSeats.splice(1, 0, ...emptySeats);

  return formattedSeats.reverse();
};

const getSeatColor = (gender) => {
  switch (gender) {
    case "F":
      return { bgClr: "hsl(0, 0%, 87%)", bdrClr: "hsl(329, 100%, 74%)" };
    case "M":
    case "O":
      return { bgClr: "hsl(0, 0%, 87%)", bdrClr: "hsl(0, 0%, 78%)" };
    default:
      return { bgClr: "white", bdrClr: "hsl(0, 0%, 74%)" };
  }
};

// main component
const Seats = ({ seatData, selectedPrice }) => {
  const upperSeats = useMemo(
    () => getSeats(seatData?.upperDeck?.seats || []),
    [seatData]
  );
  const lowerSeats = useMemo(
    () => getSeats(seatData?.lowerDeck?.seats || []),
    [seatData]
  );

  return (
    <li className={styles.seats}>
      {/* Upper deck */}
      <Deck title="Upper" seats={upperSeats} selectedPrice={selectedPrice} />
      {/* Lower deck */}
      <Deck
        title="Lower"
        seats={lowerSeats}
        selectedPrice={selectedPrice}
        hasSteering
      />
    </li>
  );
};

const Deck = ({ title, seats, selectedPrice, hasSteering }) => (
  <div className={styles.seatContainer}>
    <DeckTitle title={title}>{hasSteering && <StearingSvg />}</DeckTitle>
    <div className={styles.deckSeats}>
      {seats.map((seat, i) => (
        <SeatRow
          key={i}
          seat={seat}
          arr={seats}
          i={i}
          selectedPrice={selectedPrice}
        />
      ))}
    </div>
  </div>
);

const DeckTitle = ({ title, children }) => (
  <div className={styles.deckTitle}>
    <span>{title}</span>
    {children && <span>{children}</span>}
  </div>
);

const SeatRow = ({ seat, arr, i, selectedPrice }) => {
  let className = styles.seatRow;
  if (seat.length === 1) className += " " + styles.empty;

  return (
    <div className={className}>
      {seat.map((item, j) => (
        <SeatColumn
          key={item.seatNumber || `${i}-${j}`} // fallback key if seatNumber is empty
          item={item}
          arr={arr}
          i={i}
          j={j}
          selectedPrice={selectedPrice}
        />
      ))}
    </div>
  );
};

export const useSingleSeatData = (seatData, tripId) => {
  return seatData[tripId];
};

const SeatColumn = ({ item, arr, i, j, selectedPrice }) => {
  const { tripId } = useTripContext();
  const seatData = useSelector((state) => state.trips.allSelectedSeat);
  const { seats } = useSingleSeatData(seatData, tripId);
  const dispatch = useDispatch();

  const { bgClr, bdrClr } = getSeatColor(item.gender);
  const dynamicStyle = { backgroundColor: bgClr, borderColor: bdrClr };

  if (selectedPrice === item.price && !item.gender)
    dynamicStyle.borderColor = "hsl(143, 52%, 50%)";

  if (!item.seatNumber) dynamicStyle.visibility = "hidden";

  if (seats?.some((s) => s.seatNumber === item.seatNumber)) {
    dynamicStyle.backgroundColor = "hsl(143, 46%, 89%)";
    dynamicStyle.borderColor = "hsl(143, 52%, 50%)";
  }

  const handleSeatSelection = () => {
    if (item.gender) return;
    const seat = { seatNumber: item.seatNumber };
    seat.price = item.price;
    dispatch(setAllSelectedSeat({ seat, tripId }));
  };

  return (
    <CustomTooltip item={item}>
      <div
        onClick={handleSeatSelection}
        style={dynamicStyle}
        className={styles.seatColumn}
      >
        <span>{item.seatNumber}</span>
        <span className={styles.seatColumnIcon}></span>
      </div>
    </CustomTooltip>
  );
};

const CustomTooltip = ({ item, children }) => (
  <Tooltip
    color="white"
    placement="top"
    title={
      <span style={{ fontWeight: 500 }}>
        ₹{item.price}
        <span style={{ margin: "0 8px", color: "gray" }}> | </span>
        {item.seatNumber}
      </span>
    }
    overlayStyle={{
      boxShadow: "0px 20px 20px rgba(0,0,0,.12)",
    }}
  >
    {children}
  </Tooltip>
);

const StearingSvg = () => (
  <svg
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    width="2rem"
    height="2rem"
    fill="currentColor"
    style={{ color: "rgb(122, 122, 122)" }}
  >
    <g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)">
      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
        <path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path>
      </g>
    </g>
  </svg>
);

export default Seats;
