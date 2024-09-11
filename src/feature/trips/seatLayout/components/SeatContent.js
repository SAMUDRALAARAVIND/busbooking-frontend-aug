import { useState } from "react";
import SeatPrices from "./SeatPrices";
import Seats from "./Seats";
import styles from "../styles/seat-content-styles.module.scss";
import BoardingDroppingPoints from "./BoardingDroppingPoints";

const SeatContent = ({ seatData }) => {
  const [selectedPrice, setSelectedPrice] = useState("all");

  return (
    <>
      <SeatPrices {...{ selectedPrice, setSelectedPrice, seatData }} />
      <ul className={styles.seatLayout_content}>
        <Seats selectedPrice={selectedPrice} seatData={seatData} />
        <BoardingDroppingPoints />
      </ul>
    </>
  );
};

export default SeatContent;
