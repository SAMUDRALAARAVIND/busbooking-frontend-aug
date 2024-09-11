import styles from "../styles/seat-header-styles.module.scss";

const SEAT_LEGEND_DATA = [
  {
    title: "Available Seats",
    bgClr: "hsl(0, 0%, 100%)",
    borderClr: "hsl(0, 0%, 86%)",
  },
  {
    title: "Available for Female",
    bgClr: "hsl(0, 0%, 100%)",
    borderClr: "hsl(329, 100%, 74%)",
  },
  {
    title: "Booked Seats",
    bgClr: "hsl(0, 0%, 87%)",
    borderClr: "hsl(0, 0%, 74%)",
  },
  {
    title: "Available for Male",
    bgClr: "hsl(0, 0%, 100%)",
    borderClr: "hsl(207, 100%, 82%)",
  },
  {
    title: "Selected Seats",
    bgClr: "hsl(143, 50%, 90%)",
    borderClr: "hsl(143, 52%, 50%)",
  },
];

const SeatHeader = () => (
  <ul className={styles.seatHeader}>
    <li>
      <h3>19 Seats Available</h3>
      <p>Click on a seat to select/deselect</p>
    </li>
    <li>
      {SEAT_LEGEND_DATA.map((legend, index) => (
        <SeatLegend key={index} {...legend} />
      ))}
    </li>
  </ul>
);

const SeatLegend = ({ title, bgClr, borderClr }) => {
  const legendBoxStyles = {
    background: bgClr,
    border: `2px solid ${borderClr}`,
  };

  return (
    <div className={styles.seatLegend}>
      <span className={styles.legendBox} style={legendBoxStyles}></span>
      <p>{title}</p>
    </div>
  );
};

export default SeatHeader;
