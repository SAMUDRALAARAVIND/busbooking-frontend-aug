import BookingMobileUI from "./BookingMobileUI";
import BookingUI from "./BookingUI";
import Navbar from "../search/Navbar.js";

const BookingScreen = () => {
  return (
    <>
      <div className="booking-desktop">
        <Navbar/>
        <BookingUI />
      </div>
      <div className="booking-mobile">
        <BookingMobileUI />
      </div>
    </>
  );
};

export default BookingScreen;
