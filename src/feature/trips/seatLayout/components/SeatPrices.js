import { useMemo } from "react";
import styles from "../styles/seat-prices-styles.module.scss";

const getAllPrices = (seatData) => {
  if (!Object.keys(seatData).length) return [];

  const priceObj = {};
  // Collect prices from both upper and lower decks
  [...seatData.upperDeck.seats, ...seatData.lowerDeck.seats].forEach((seat) => {
    if (!priceObj[seat.price]) {
      priceObj[seat.price] = true;
    }
  });

  return Object.keys(priceObj);
};

const SeatPrices = ({ selectedPrice, setSelectedPrice, seatData }) => {
  // Memoize price calculation to avoid recomputing on each render
  const prices = useMemo(() => getAllPrices(seatData), [seatData]);

  return (
    <div className={styles.seatPrice}>
      <button
        className={selectedPrice === "all" ? styles.active : ""}
        onClick={() => setSelectedPrice("all")}
      >
        All
      </button>
      {prices.map((price, idx) => (
        <button
          key={idx}
          className={selectedPrice === Number(price) ? styles.active : ""}
          onClick={() => setSelectedPrice(Number(price))}
        >
          ₹{price}
        </button>
      ))}
    </div>
  );
};

export default SeatPrices;
