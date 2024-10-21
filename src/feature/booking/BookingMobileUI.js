import "./styles/BookingMobileUI.scss";

const BookingMobileUI = ({ selectedSeatsData, handelSubmit, loading }) => {
  const amountToBePaid =
    selectedSeatsData.assuredCharge +
    selectedSeatsData.busFare +
    selectedSeatsData.gstAmount;
  return (
    <form onSubmit={handelSubmit}>
      <div className="city-info-mobile">
        <div className="cities">
          <span>
            <i className="material-icons-outlined">chevron_left</i>
          </span>
          <h4>{selectedSeatsData.tripData.sourceCity}</h4>
          <span>
            <i className="material-icons-outlined">arrow_forward</i>
          </span>
          <h4>{selectedSeatsData?.tripData?.destinationCity}</h4>
        </div>
        <p>{selectedSeatsData?.departureDate}</p>
      </div>

      <div className="trip-info-mobile">
        <div>
          <p>{selectedSeatsData.departureDate}</p>
          <h3>{selectedSeatsData.points.boardingPoint.arrivalTime}</h3>
          <p>
            {selectedSeatsData.points.boardingPoint.title.split(" ")[0]} ---
          </p>
        </div>

        <div>
          <p>10h 30m</p>
          <div className="divider">
            <i className="material-icons">circle</i>
            <div>
              <hr />
            </div>
            <i className="material-icons">circle</i>
          </div>
        </div>
        <div>
          <p>{selectedSeatsData.arrivalDate}</p>
          <h3>{selectedSeatsData.points.droppingPoint.arrivalTime}</h3>
          <p>
            {selectedSeatsData.points.droppingPoint.title.split(" ")[0]} ---
          </p>
        </div>
      </div>

      <div className="contact-details-mobile">
        <h2>Contact Details</h2>
        <p>Your ticket info will be sent here</p>
        <div className="form">
          <div className="input-div">
            <i class="material-icons-outlined">phone</i>
            +91{" "}
            <input
              type="number"
              name="contact-number"
              id="phoneNumber"
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <hr />
          <div className="input-div">
            <i class="material-icons-outlined">email</i>
            <input
              type="email"
              name="email"
              id="passengers-email"
              placeholder="Enter Email Address"
              required
            />
          </div>
        </div>
      </div>

      <div className="passenger-details-mobile">
        <div>
          <h2>Passenger Details</h2>
          <p>Fill passenger details corresponding to the seats</p>
        </div>
        {selectedSeatsData?.seats?.map((seat) => {
          return (
            <div className="form" key={seat.seatNumber}>
              <p>
                Add Passenger for seat : <span> {seat.seatNumber}</span>
              </p>
              <div className="user-info">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name={`${seat.seatNumber}_name`}
                />
                <input
                  type="number"
                  placeholder="Age"
                  name={`${seat.seatNumber}_age`}
                  required
                />
                <div className="btn-mobile">
                  <input
                    type="radio"
                    className="btn-mobile-radio"
                    name={`${seat.seatNumber}_gender`}
                    id={`${seat.seatNumber}_male`}
                    value={"M"}
                    required
                  />
                  <label className="male" htmlFor={`${seat.seatNumber}_male`}>
                    Male
                  </label>
                  <hr />
                  <input
                    type="radio"
                    className="btn-mobile-radio"
                    name={`${seat.seatNumber}_gender`}
                    id={`${seat.seatNumber}_female`}
                    value={"F"}
                    required
                  />
                  <label
                    className="female"
                    htmlFor={`${seat.seatNumber}_female`}
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="proceed-btn"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        <div className="proceed-btn-left">
          <p>
            <i class="material-icons-outlined">currency_rupee</i>
            {amountToBePaid}
          </p>
          <hr />
          <div className="seat-detail">
            {selectedSeatsData.seats.map((seat) => {
              return <h3 key={seat.seatNumber}>{seat.seatNumber}</h3>;
            })}
            <p>Selected Seats</p>
          </div>
        </div>
        <p>{loading ? "Submiting" : "Proceed"}</p>
      </button>
    </form>
  );
};

export default BookingMobileUI;
