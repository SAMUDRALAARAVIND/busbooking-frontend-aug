import "./styles/BookingMobileUI.scss";
// import { useSelector } from "react-redux";

const BookingMobileUI = () => {
  //   const suggestions = useSelector((state) => state);
  //   console.log(suggestions.search.sourceCity);
  return (
    <div>
      <div className="city-info-mobile">
        <div className="cities">
          <span>
            <i className="material-icons-outlined">chevron_left</i>
          </span>
          {/* <h3>{suggestions.search.sourceCity}</h3>
          <h3>{suggestions.search.destinationCity}</h3> */}
          <h4>Mumbai</h4>
          <span>
            <i className="material-icons-outlined">arrow_forward</i>
          </span>
          <h4>Delhi</h4>
        </div>
        <p>Sun 22 sep</p>
      </div>

      <div className="trip-info-mobile">
        <div>
          <p>Sun 22 Sep</p>
          <h3>16:30</h3>
          <p>Gachibowli ---</p>
        </div>

        <div>
          <p>10h 30m</p>
          <div className="divider">
            <i className="material-icons">circle</i>
            <div><hr /></div>
            <i className="material-icons">circle</i>
          </div>
        </div>
        <div>
          <p>Sun 22 Sep</p>
          <h3>16:30</h3>
          <p>Gachibowli ---</p>
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
              id="contact-number"
              placeholder="Enter Mobile Number"
            />
          </div>
          <hr />
          <div className="input-div">
            <i class="material-icons-outlined">email</i>
            <input
              type="email"
              name="passengers-email"
              id="passengers-email"
              placeholder="Enter Email Address"
            />
          </div>
        </div>
      </div>

      <div className="passenger-details-mobile">
        <div>
          <h2>Passenger Details</h2>
          <p>Fill passenger details corresponding to the seats</p>
        </div>
        <div className="form">
          <p>
            Add Passenger for seat : <span>1LC</span>
          </p>
          <div className="user-info">
            <input type="text" placeholder="Name" />
            <input type="number" placeholder="Age" />
            <div className="btn-mobile">
              <button className="male">Male</button>
              <hr />
              <button className="female">Female</button>
            </div>
          </div>
        </div>
      </div>

      <div className="proceed-btn">
        <p>
          <i class="material-icons-outlined">currency_rupee</i>
          3120
        </p>
        <hr />
        <div className="seat-detail">
          <h3>1LC</h3>
          <p>Selected Seat</p>
        </div>
        <p>Proceed</p>
      </div>
    </div>
  );
};

export default BookingMobileUI;
