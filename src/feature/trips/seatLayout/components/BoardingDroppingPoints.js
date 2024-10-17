import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styles from "../styles/points-styles.module.scss";
import {
  setAllTripsSelectedSeatData,
  setSelectedSeatData,
} from "../../redux/slice";
import { useSingleSeatData } from "./Seats";
import { useTripContext } from "../SeatLayout";
import { useNavigate } from "react-router-dom";

const BoardingDroppingPoints = () => {
  const { tripId } = useTripContext();
  const seatData = useSelector((state) => state.trips.allTripsSelectedSeatData);
  const { seats, points } = useSingleSeatData(seatData, tripId);
  const [brPoints, drPoints] = useGetPoints();
  console.log(brPoints, drPoints);
  const [boardingPoint, setBoardingPoint] = useState(points?.boardingPoint);
  const [droppingPoint, setDroppingPoint] = useState(points?.droppingPoint);

  const selectedBoardingPointData = {
    type: "BoardingPoint",
    selectedPoint: boardingPoint,
    setPoint: setBoardingPoint,
  };
  const selectedDropingPointData = {
    type: "DropingPoint",
    selectedPoint: droppingPoint,
    setPoint: setDroppingPoint,
  };

  return (
    <li className={styles.seatLayout_stopPoints}>
      {boardingPoint ? (
        <SelectedPoint {...selectedBoardingPointData} />
      ) : (
        <PointList
          points={brPoints}
          setPoint={setBoardingPoint}
          type="Search Boarding Point"
        />
      )}

      {boardingPoint && droppingPoint && (
        <SelectedPoint {...selectedDropingPointData} />
      )}

      {boardingPoint && !droppingPoint && (
        <PointList
          points={drPoints}
          setPoint={setDroppingPoint}
          type={"Search Dropping Point"}
        />
      )}

      {/* Dummy button */}
      <button style={{ height: "60px" }}></button>
      <BookingButton {...{ boardingPoint, droppingPoint, seats, tripId }} />
    </li>
  );
};

const BookingButton = ({ droppingPoint, boardingPoint, seats, tripId }) => {
  const isDisabled = !(seats?.length && boardingPoint && droppingPoint);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
    const points = { boardingPoint, droppingPoint };
    const singleSeatData = { tripId, seats, points };
    Cookies.set("selectedSeatData", JSON.stringify(singleSeatData), {
      expires,
      path: "/",
    });
    dispatch(setAllTripsSelectedSeatData({ tripId, points }));
    dispatch(setSelectedSeatData(singleSeatData));
    navigate("/book");
    // alert("Seat data saved to cookie");
  };

  return (
    <button
      disabled={isDisabled}
      className={styles.bookingButton}
      style={{
        backgroundColor: isDisabled ? "hsl(0, 0%, 82%)" : "hsl(4, 65%, 61%)",
      }}
      onClick={handleClick}
    >
      {!seats?.length ? (
        "Select seat to continue"
      ) : (
        <ButtonActive selectedSeats={seats ? seats : []} />
      )}
    </button>
  );
};

const ButtonActive = ({ selectedSeats }) => (
  <div className={styles.activeButton}>
    <span className={styles.totalPrice}>
      ₹{selectedSeats.reduce((total, seat) => total + seat.price, 0)}
    </span>
    <p className={styles.selectedSeats}>
      <span>{selectedSeats.map((seat) => seat.seatNumber).join(", ")}</span>
      <span style={{ fontSize: ".7rem" }}>selected Seats</span>
    </p>
    <span>Continue</span>
  </div>
);

const SelectedPoint = ({ setPoint, type, selectedPoint }) => {
  const { title, directions, arrivalTime } = selectedPoint;
  return (
    <div className={styles.selectedPointCard}>
      <div>
        <p>{type}</p>
        <h4>{title}</h4>
        <p>{arrivalTime}</p>
        <span style={{ fontSize: ".67rem" }}>{directions}</span>
      </div>
      <button onClick={() => setPoint("")}>Change</button>
    </div>
  );
};

const po = [
  {
    title:
      "Shamshabad - Boarding Zone - IntrCity Boarding Zone, MS Complex Hotel New Golden Pride Lodge, NH 44, Brindavan Colony",
    directions:
      "IntrCity Boarding Zone, MS Complex, Hotel New Golden Pride Lodge, NH 44, Brindavan Colony(Hyderabad)",
    arrivalTime: "3:33",
  },
  {
    title:
      "Miyapur - Boarding Zone - Opposite Metro Pillar 641, KPHB Road, Hyderabad",
    directions: "Opposite Metro Pillar 641, KPHB Road, Miyapur (Hyderabad)",
    arrivalTime: "4:45",
  },
  {
    title:
      "Secunderabad - Boarding Zone - Paradise Metro Station, MG Road, Hyderabad",
    directions: "Paradise Metro Station, MG Road, Secunderabad (Hyderabad)",
    arrivalTime: "2:15",
  },
  {
    title:
      "Gachibowli - Boarding Zone - Near DLF Cyber City, Gachibowli, Hyderabad",
    directions: "Near DLF Cyber City, Gachibowli (Hyderabad)",
    arrivalTime: "5:30",
  },
  {
    title:
      "Banjara Hills - Boarding Zone - Opposite LV Prasad Eye Institute, Road No. 2, Hyderabad",
    directions:
      "Opposite LV Prasad Eye Institute, Road No. 2, Banjara Hills (Hyderabad)",
    arrivalTime: "6:10",
  },
  {
    title:
      "Kondapur - Boarding Zone - Opposite Botanical Garden, Kondapur Main Road, Hyderabad",
    directions: "Opposite Botanical Garden, Kondapur Main Road (Hyderabad)",
    arrivalTime: "7:00",
  },
];

const useGetPoints = () => {
  const { boardingPoints, droppingPoints } = useTripContext();

  const bdPoints = useSelector(
    (state) => state.trips.tripsResponse.boardingPoints
  );
  const drPoints = useSelector(
    (state) => state.trips.tripsResponse.dropingPoints
  );
  return [
    boardingPoints.map((p) => {
      const date = new Date(p.arrivalTime * 1000);
      const arrivalTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return {
        ...p,
        ...bdPoints.find((item) => item.seatId === p.seatId),
        arrivalTime,
      };
    }),
    droppingPoints.map((p) => {
      const date = new Date(p.arrivalTime * 1000);
      const arrivalTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return {
        ...drPoints.find((item) => item.seatId === p.seatId),
        arrivalTime,
      };
    }),
  ];
};

const PointList = ({ type, points = po, setPoint }) => {
  const [searchStr, setSearchStr] = useState("");
  const filteredPoints = points.filter((point) => {
    return point.title
      .toLocaleLowerCase()
      .includes(searchStr.toLocaleLowerCase());
  });

  return (
    <div className={styles.pointsCard}>
      <SearchBar type={type} {...{ setSearchStr, searchStr }} />
      <ul className={styles.pointsListContainer}>
        {filteredPoints.map((point, index) => (
          <li key={index} className={styles.singlePointContainer}>
            <div className={styles.singlePoint}>
              <input type="checkbox" onClick={() => setPoint(point)} />
              <div>
                <p onClick={() => setPoint(point)}>{point.title}</p>
                <span className={styles.subContent}>{point.directions}</span>
              </div>
            </div>
            <span>{point.arrivalTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const SearchBar = ({ type, setSearchStr, searchStr }) => {
  return (
    <p className={styles.pointSearchBar} style={{ position: "relative" }}>
      <FaSearch
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          color: "hsl(4, 65%, 73%)",
        }}
      />
      <input
        type="text"
        placeholder={type}
        value={searchStr}
        onChange={({ target }) => setSearchStr(target.value)}
      />
    </p>
  );
};

export default BoardingDroppingPoints;
