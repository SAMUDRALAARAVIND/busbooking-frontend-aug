import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import styles from "../styles/points-styles.module.scss";

const BoardingDroppingPoints = () => {
  const points = Cookies.get("points") ? JSON.parse(Cookies.get("points")) : {};
  const [boardingPoint, setBoardingPoint] = useState(points.boardingPoint);
  const [droppingPoint, setDroppingPoint] = useState(points.droppingPoint);

  return (
    <li className={styles.seatLayout_stopPoints}>
      {boardingPoint ? (
        <SelectedPoint setPoint={setBoardingPoint} />
      ) : (
        <PointList setPoint={setBoardingPoint} type="Search Boarding Point" />
      )}

      {boardingPoint && droppingPoint && (
        <SelectedPoint setPoint={setDroppingPoint} />
      )}

      {boardingPoint && !droppingPoint && (
        <PointList setPoint={setDroppingPoint} type={"Search Dropping Point"} />
      )}

      {/* Dummy button */}
      <button style={{ height: "60px" }}></button>
      <BookingButton {...{ boardingPoint, droppingPoint }} />
    </li>
  );
};

const BookingButton = ({ droppingPoint, boardingPoint }) => {
  const selectedSeats = useSelector((state) => state.trips.selectedSeats);
  const isDisabled = !(selectedSeats.length && boardingPoint && droppingPoint);

  const handleClick = () => {
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
    Cookies.set("selectedSeats", JSON.stringify(selectedSeats), {
      expires,
      path: "/",
    });
    Cookies.set("points", JSON.stringify({ boardingPoint, droppingPoint }), {
      expires,
      path: "/",
    });

    alert("Seat data saved to cookie");
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
      {!selectedSeats.length ? (
        "Select seat to continue"
      ) : (
        <ButtonActive selectedSeats={selectedSeats} />
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

const SelectedPoint = ({ setPoint }) => (
  <div className={styles.selectedPointCard}>
    <div>
      <p>Boarding Point</p>
      <h4>
        Gachi_bowli_(O) - Infront of Centro Mall, Towards Kondapur (Van Pickup)
      </h4>
      <p>3:99</p>
      <span style={{ fontSize: ".67rem" }}>
        Infront of Centro Mall, Towards Kondapur (Van Pickup) (Hyderabad)
      </span>
    </div>
    <button onClick={() => setPoint("")}>Change</button>
  </div>
);

const PointList = ({ type, points = ["f", "d", "d"], setPoint }) => (
  <div className={styles.pointsCard}>
    <SearchBar type={type} />
    <ul className={styles.pointsListContainer}>
      {points.map((point, index) => (
        <li key={index} className={styles.singlePointContainer}>
          <div className={styles.singlePoint}>
            <input type="checkbox" onClick={() => setPoint("dsfd")} />
            <div>
              <p onClick={() => setPoint("dfdsf")}>
                Shamshabad - Boarding Zone - IntrCity Boarding Zone, MS Complex,
                Hotel New Golden Pride Lodge, NH 44, Brindavan Colony
              </p>
              <span className={styles.subContent}>
                IntrCity Boarding Zone, MS Complex, Hotel New Golden Pride
                Lodge, NH 44, Brindavan Colony (Hyderabad)
              </span>
            </div>
          </div>
          <span>3:99</span>
        </li>
      ))}
    </ul>
  </div>
);

const SearchBar = ({ type }) => (
  <p className={styles.pointSearchBar} style={{ position: "relative" }}>
    <FaSearch
      style={{
        position: "absolute",
        left: "10px",
        top: "10px",
        color: "hsl(4, 65%, 73%)",
      }}
    />
    <input type="text" placeholder={type} />
  </p>
);

export default BoardingDroppingPoints;
