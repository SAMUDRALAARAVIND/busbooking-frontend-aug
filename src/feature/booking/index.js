import BookingMobileUI from "./BookingMobileUI";
import BookingUI from "./BookingUI";

const BookingScreen = () => {
  return (
    <>
      <div className="booking-desktop">
        <BookingUI />
      </div>
      <div className="booking-mobile">
        <BookingMobileUI />
      </div>
    </>
  );
};

export default BookingScreen;
