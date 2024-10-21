import { Collapse, Space } from "antd";
import "./styles/BookingUI.scss";

const BookingUI = ({ selectedSeatsData, handelSubmit, loading }) => {
  return (
    <form onSubmit={handelSubmit}>
      <div className="city-info">
        <div className="cities">
          <div className="city-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
              viewBox="0 0 23 22"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.552.065c-.74.18-1.384.81-1.643 1.608-.068.21-.08.488-.101 2.509l-.024 2.272-.27.097A2.378 2.378 0 0 0 .066 8.144C.019 8.324 0 8.61 0 9.138c0 .91.053 1.096.41 1.453.297.298.583.409 1.05.409h.341l.013 3.643.013 3.642.1.278c.147.407.293.634.61.948.281.278.7.529.976.584l.13.026.02.417c.031.656.265 1.056.777 1.326l.223.118 1.228.013c1.17.012 1.24.008 1.476-.08.17-.064.319-.164.476-.321.298-.299.41-.584.41-1.054v-.342h5.5v.342c0 .47.112.756.41 1.054.157.157.306.257.476.321.237.088.306.092 1.476.08l1.228-.013.223-.118c.512-.27.746-.67.778-1.326l.02-.418.129-.025c.276-.055.695-.306.975-.584.318-.314.465-.541.611-.948l.1-.278.013-3.642.013-3.643h.34c.467 0 .754-.111 1.051-.408a1.34 1.34 0 0 0 .305-.437 1.34 1.34 0 0 1 .112-.249c.048-.055.047-1.625-.002-1.596-.02.013-.049-.05-.063-.14-.045-.278-.32-.77-.58-1.035-.301-.306-.529-.458-.876-.584l-.27-.097-.024-2.272c-.026-2.5-.021-2.45-.308-2.993-.17-.319-.606-.755-.928-.927-.523-.279-.079-.264-7.98-.26-6.046.002-7.218.012-7.43.063Zm1.964 1.86a1.35 1.35 0 0 0-.548 2.198c.102.109.278.245.392.303l.206.105H16.44l.207-.105a1.73 1.73 0 0 0 .39-.303c.62-.662.42-1.736-.396-2.137l-.244-.12-5.33-.009c-5.028-.01-5.342-.005-5.551.067Zm-.73 3.618c-.397.08-.742.333-.942.694l-.126.229-.012 2.627c-.012 2.563-.01 2.634.076 2.864.118.316.446.644.759.761.23.086.308.087 6.462.087s6.232 0 6.462-.087c.314-.117.64-.445.759-.76.086-.231.088-.302.076-2.865l-.012-2.627-.126-.229c-.154-.278-.352-.457-.667-.605l-.238-.112-6.147-.006c-3.38-.004-6.226.01-6.324.029ZM.018 9.13c0 .45.006.627.014.396.008-.232.008-.6 0-.817-.008-.217-.014-.028-.014.421Zm5.505 5.623a1.418 1.418 0 0 0-.837.828c-.318.843.279 1.749 1.193 1.812a1.374 1.374 0 0 0 1.3-.75c.149-.294.168-.763.044-1.093a1.434 1.434 0 0 0-.76-.766c-.263-.099-.728-.114-.94-.03Zm10.009.03c-.304.12-.632.456-.75.767-.123.33-.104.799.045 1.094.245.484.769.786 1.3.749 1.148-.08 1.692-1.432.91-2.267-.274-.293-.524-.404-.94-.418-.265-.009-.396.009-.565.076Z"
                clipRule="evenodd"
              />
            </svg>
            <p>{selectedSeatsData.tripData.sourceCity}</p>
          </div>
          <span>
            <i className="material-icons-outlined">arrow_forward</i>
          </span>
          <div className="city-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 10 12"
            >
              <path
                d="M5 0a4.789 4.789 0 0 0-5 4.532c0 3.552 4.53 7.218 4.723 7.373a.453.453 0 0 0 .554 0C5.47 11.751 10 8.084 10 4.532A4.789 4.789 0 0 0 5 0Zm0 7a2.514 2.514 0 1 1 2.778-2.5A2.652 2.652 0 0 1 5 7Z"
                data-name="Path 1660"
              />
            </svg>
            <p>{selectedSeatsData.tripData.destinationCity}</p>
          </div>
          <hr />
          <p>{selectedSeatsData.departureDate}</p>
        </div>
      </div>
      <div className="parent">
        <div className="left-div">
          <Space direction="vertical">
            <Collapse
              bordered={false}
              expandIconPosition="end"
              collapsible="header"
              style={{ background: "white", width: "100%" }}
              items={[
                {
                  key: "1",
                  label: (
                    <div className="trip-details">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3rem"
                        height="1.3rem"
                        fill="#3DC070"
                        className="data-fill-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                      </svg>
                      <span className="para">Trip Details</span>
                    </div>
                  ),
                  children: (
                    <div className="trip-details-body">
                      <div className="bus-partner-details">
                        <div className="bus-partner-details-left">
                          <span className="span-top">Bus Partner</span>
                          <span className="span-bottom">
                            {selectedSeatsData.tripData.busPartner} ({selectedSeatsData.tripData.amenities[0]}) onboard)
                          </span>
                        </div>
                        <div className="bus-partner-details-right">
                          <span className="span-top">Seat No</span>
                          <span className="span-bottom">{
                            selectedSeatsData?.seats.map((seat) => {
                              return <span key={seat.seatNumber}>{seat.seatNumber}</span>
                            })
                          }</span>
                        </div>
                      </div>
                      <div className="bus-partner-details-left">
                        <span className="span-top">Bus Type</span>
                        <span className="span-bottom">{selectedSeatsData?.tripData?.busType} (2 + 1)</span>
                      </div>

                      <hr className="trip-devider" />
                      <div className="boarding-droping-details">
                        <div className="boarding-point">
                          <h3>Boarding</h3>
                          <div>
                            <span>{selectedSeatsData.BoardingTime}</span>
                            <span className="departure-time time">{selectedSeatsData.points.boardingPoint.arrivalTime}</span>
                          </div>
                          <span>{selectedSeatsData.points.boardingPoint.title.split(" ")[0]}</span>
                        </div>
                        <div className="distance">
                          <div className="dashline-wrraper">
                            <svg
                              width="0.25rem"
                              height="0.25rem"
                              viewBox="0 0 16 16"
                              fill="rgb(209, 209, 209)"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ color: "inherit" }}
                            >
                              <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                            <span className="dashed-line"></span>
                          </div>
                          <div className="time-border">10:55 Hrs</div>
                          <div className="dashline-wrraper">
                            <span className="dashed-line"></span>
                            <svg
                              width="0.25rem"
                              height="0.25rem"
                              viewBox="0 0 16 16"
                              fill="rgb(209, 209, 209)"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ color: "inherit" }}
                            >
                              <circle cx="8" cy="8" r="8"></circle>
                            </svg>
                          </div>
                        </div>
                        <div className="droping-point">
                          <h3>Dropping</h3>
                          <div>
                            <span>{selectedSeatsData.droppingTime}</span>
                            <span className="departure-time time">{selectedSeatsData.points.droppingPoint.arrivalTime}</span>

                          </div>
                          <span>{selectedSeatsData.points.droppingPoint.title.split(" ")[0]} </span>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Space>
          <Space direction="vertical">
            <Collapse
              bordered={false}
              expandIconPosition="end"
              collapsible="header"
              defaultActiveKey={["1"]}
              style={{
                background: "white",
              }}
              items={[
                {
                  key: "1",
                  label: (
                    <div className="Passenger-Details-head">
                      <h2 className="title">Passenger Details</h2>
                    </div>
                  ),

                  children: (
                    <div className="Passenger-Details-body">

                      {
                        selectedSeatsData?.seats?.map((seat) => {
                          return <div key={seat.seatNumber}>
                            <div className="Add-Passenger">
                              Add Passenger for :{" "}
                              <span class="text-success"> {seat.seatNumber}</span>
                            </div>

                            <div className="add-details">
                              <div className="form-control name">
                                <input type="text" placeholder="Name" name={`${seat.seatNumber}_name`} required />
                              </div>

                              <div className="form-control age">
                                <input type="number" placeholder="Age" name={`${seat.seatNumber}_age`} required />
                              </div>

                              <div className="gemder-wrraper">
                                <input type="radio" className="gemder-wrraper-radio" name={`${seat.seatNumber}_gender`} id={`${seat.seatNumber}_male`} value={'M'} required />
                                <label className="gender-option" htmlFor={`${seat.seatNumber}_male`}>Male</label>

                                <input type="radio" className="gemder-wrraper-radio" name={`${seat.seatNumber}_gender`} id={`${seat.seatNumber}_female`} value={'F'} required />
                                <label className="gender-option" htmlFor={`${seat.seatNumber}_female`}>Female</label>

                              </div>
                            </div>
                          </div>
                        })
                      }

                      <div className="contact-details">
                        <h6>Contact Details</h6>
                        <small className="text-grey">
                          Get bus updates and ticket details via WhatsApp and
                          Email
                        </small>
                        <div className="input-container">
                          <div className="passenger-details-mob-input">
                            <span>+91</span>
                            |
                            <input
                              type="text"
                              placeholder="Enter Mobile Number"
                              name="phoneNumber"
                            />
                          </div>
                          <div className="passenger-details-mob-input">
                            <i className="material-icons">mail</i>
                            <input
                              type="email"
                              placeholder="Enter Email Address"
                              name="email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Space>

          <div className="pay-btn-wrraper">
            <button
              className="pay-button"
              type="submit"
              disabled={loading}
              style={{cursor: loading ? 'not-allowed' : "pointer"}}
            >
              {
                loading ? 
                <p>Submiting....</p>:
                <>

                Continue to Pay ₹ {selectedSeatsData.assuredCharge + selectedSeatsData.totalFare}
                <div className="arrow-svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 626 626"
                    width="30px"
                    height="30px"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "translate3d(0px, 0px, 0px)",
                      contentVisibility: "visible",
                    }}
                  >
                    <defs>
                      <clipPath id="__lottie_element_2">
                        <rect width="626" height="626" x="0" y="0"></rect>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_2)">
                      <g
                        transform="matrix(1,0,0,1,330.54,313)"
                        opacity="1"
                        style={{ display: "block" }}
                      >
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,240,240)"
                            strokeOpacity="1"
                            strokeWidth="50"
                            d="M92.5,-86.5 C92.5,-86.5 188.5,13 188.5,13 C188.5,13 87.5,118 87.5,118"
                          />
                        </g>
                      </g>
                      <g
                        transform="matrix(1,0,0,1,208.24,313)"
                        opacity="0.66"
                        style={{ display: "block" }}
                      >
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(253,216,214)"
                            strokeOpacity="1"
                            strokeWidth="50"
                            d="M92.5,-86.5 C92.5,-86.5 188.5,13 188.5,13 C188.5,13 87.5,118 87.5,118"
                          />
                        </g>
                      </g>
                      <g
                        transform="matrix(1,0,0,1,84.79,313)"
                        opacity="0.33"
                        style={{ display: "block" }}
                      >
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,144,140)"
                            strokeOpacity="1"
                            strokeWidth="50"
                            d="M92.5,-86.5 C92.5,-86.5 188.5,13 188.5,13 C188.5,13 87.5,118 87.5,118"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </>
              }
            </button>
          </div>
        </div>

        <div className="right-div">
          <h2>Fare Details</h2>
          <div className="fare" style={{ display: "flex" }}>
            <Space direction="vertical">
              <Collapse
                bordered={false}
                expandIconPosition="end"
                collapsible="header"
                style={{ background: "white", width: "100%" }}
                items={[
                  {
                    key: "1",
                    label: (
                      <div>
                        <div className="fare-left">
                          <p>Total Fare (inclusive)</p>
                          <p>₹ {selectedSeatsData.totalFare}</p>
                        </div>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="fare-child">
                          <p>Bus Fare </p>
                          <p>+ ₹ {selectedSeatsData.busFare}</p>
                        </div>
                        <div className="fare-child">
                          <p>Bus Partner GST </p>
                          <p>+ ₹ {selectedSeatsData.gstAmount}</p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </Space>
            <div className="fare-right">
              <p>Assured Charge </p>
              <p>₹ {selectedSeatsData.assuredCharge}</p>
            </div>
          </div>
          <hr style={{ border: "none", borderBottom: "1px solid #f2f2f2" }} />
          <div className="fare-bottom">
            <p>Total Amount To Be Paid</p>
            <p>₹ {selectedSeatsData.totalFare + selectedSeatsData.assuredCharge}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingUI;
