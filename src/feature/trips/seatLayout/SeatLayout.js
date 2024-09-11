import React, { useEffect, useState } from "react";
import Spinner from "../../../utlis/Spiner";
import SeatHeader from "./components/SeatHeader";
import SeatContent from "./components/SeatContent";

import styles from "./styles/seat-layout-styles.module.scss";

const SEAT_DATA = {
  upperDeck: {
    seats: [
      { seatNumber: "U1", gender: null, row: 1, column: 1, price: 300 },
      { seatNumber: "U4", gender: "F", row: 1, column: 2, price: 350 },
      { seatNumber: "U7", gender: null, row: 1, column: 3, price: 300 },
      { seatNumber: "U10", gender: "M", row: 1, column: 4, price: 320 },
      { seatNumber: "U13", gender: "F", row: 1, column: 5, price: 350 },
      { seatNumber: "U16", gender: null, row: 1, column: 6, price: 320 },
      { seatNumber: "U2", gender: null, row: 2, column: 1, price: 300 },
      { seatNumber: "U5", gender: "O", row: 2, column: 2, price: 340 },
      { seatNumber: "U8", gender: null, row: 2, column: 3, price: 350 },
      { seatNumber: "U11", gender: null, row: 2, column: 4, price: 300 },
      { seatNumber: "U14", gender: "M", row: 2, column: 5, price: 350 },
      { seatNumber: "U17", gender: null, row: 2, column: 6, price: 320 },
      { seatNumber: "U3", gender: null, row: 3, column: 1, price: 310 },
      { seatNumber: "U6", gender: "F", row: 3, column: 2, price: 300 },
      { seatNumber: "U9", gender: "M", row: 3, column: 3, price: 340 },
      { seatNumber: "U12", gender: null, row: 3, column: 4, price: 320 },
      { seatNumber: "U15", gender: "O", row: 3, column: 5, price: 300 },
      { seatNumber: "U18", gender: "F", row: 3, column: 6, price: 350 },
    ],
  },
  lowerDeck: {
    seats: [
      { seatNumber: "L1", gender: "M", row: 1, column: 1, price: 300 },
      { seatNumber: "L4", gender: "O", row: 1, column: 2, price: 350 },
      { seatNumber: "L7", gender: null, row: 1, column: 3, price: 300 },
      { seatNumber: "L10", gender: null, row: 1, column: 4, price: 320 },
      { seatNumber: "L13", gender: "F", row: 1, column: 5, price: 350 },
      { seatNumber: "L16", gender: null, row: 1, column: 6, price: 320 },
      { seatNumber: "L2", gender: "F", row: 2, column: 1, price: 300 },
      { seatNumber: "L5", gender: "M", row: 2, column: 2, price: 340 },
      { seatNumber: "L8", gender: null, row: 2, column: 3, price: 350 },
      { seatNumber: "L11", gender: null, row: 2, column: 4, price: 300 },
      { seatNumber: "L14", gender: "O", row: 2, column: 5, price: 350 },
      { seatNumber: "L17", gender: null, row: 2, column: 6, price: 320 },
      { seatNumber: "L3", gender: null, row: 3, column: 1, price: 310 },
      { seatNumber: "L6", gender: "F", row: 3, column: 2, price: 300 },
      { seatNumber: "L9", gender: "M", row: 3, column: 3, price: 340 },
      { seatNumber: "L12", gender: null, row: 3, column: 4, price: 320 },
      { seatNumber: "L15", gender: "F", row: 3, column: 5, price: 300 },
      { seatNumber: "L18", gender: null, row: 3, column: 6, price: 350 },
    ],
  },
};

const SeatLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [seatData, setSeatData] = useState({});

  useEffect(() => {
    const loadSeatData = () => {
      setIsLoading(false);
      setSeatData(SEAT_DATA);
    };

    const timer = setTimeout(loadSeatData, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Something went wrong</h1>;

  return (
    <div className={styles.seatLayout_container}>
      <SeatHeader />
      <SeatContent seatData={seatData} />
    </div>
  );
};

export default SeatLayout;
