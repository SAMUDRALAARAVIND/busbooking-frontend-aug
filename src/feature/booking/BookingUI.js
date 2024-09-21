import { Collapse, Space } from 'antd';
import './styles/BookingUI.scss'

const BookingUI = () => {
  return (

    <div className="parent">
      <div className="left-div">
        <Space direction="vertical">
          <Collapse
            expandIconPosition='end'
            collapsible="header"
            defaultActiveKey={['1']}
            style={{ background: 'white' }}
            items={[
              {
                key: '1',
                label:
                  <div className='trip-details'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="#3DC070" class="data-fill-check" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg>
                    <span className='para'>Trip Details</span>
                  </div>,
                children: <div className='trip-details-body'>
                  <div className='bus-partner-details'>
                    <div className="bus-partner-details-left">
                      <span className='span-top'>Bus Partner</span>
                      <span className='span-bottom'>IntrCity SmartBus (Washroom onboard)</span>
                    </div>
                    <div className="bus-partner-details-right">
                      <span className='span-top'>Seat No</span>
                      <span className='span-bottom'>4UC</span>
                    </div>

                  </div>
                  <div className="bus-partner-details-left">
                    <span className='span-top'>Bus Type</span>
                    <span className='span-bottom'>AC Sleeper (2 + 1)</span>
                  </div>

                  <hr className='trip-devider' />
                  <div className='boarding-droping-details'>
                    <div className="boarding-point">
                      <h6>Boarding</h6>
                      <div>
                        20 Sep 2024,
                        <span class="departure-time">18:10</span>
                      </div>
                      <span>Gachibowli - Infro</span>
                    </div>
                    <div className="distance">
                      <div className="dashline-wrraper">
                        <svg width="0.25rem" height="0.25rem" viewBox="0 0 16 16" fill="rgb(209, 209, 209)" xmlns="http://www.w3.org/2000/svg" style={{ color: 'inherit' }}><circle cx="8" cy="8" r="8"></circle></svg>
                        <span class="dashed-line"></span>
                      </div>
                      <div class="time-border">10:55 Hrs</div>
                      <div className="dashline-wrraper">
                        <span class="dashed-line"></span>
                        <svg width="0.25rem" height="0.25rem" viewBox="0 0 16 16" fill="rgb(209, 209, 209)" xmlns="http://www.w3.org/2000/svg" style={{ color: 'inherit' }}><circle cx="8" cy="8" r="8"></circle></svg>
                      </div>
                    </div>
                    <div className="droping-point">
                      <h6>Dropping</h6>
                      <div>
                        21 Sep 2024,
                        <span class="departure-time">08:35</span>
                      </div>
                      <span className='source-name'>Gummadipundi</span>
                    </div>
                  </div>

                </div>,
              },
            ]}
          />
        </Space>
        <Space direction="vertical">
          <Collapse
            expandIconPosition='end'
            collapsible="header"
            defaultActiveKey={['2']}
            style={{ background: 'white' }}
            items={[
              {
                key: '1',
                label: <div className='Passenger-Details-head'>
                  <span className='title'>Passenger Details</span>
                </div>,

                children: <div className='Passenger-Details-body'>
                  <div className='Add-Passenger'>
                    Add Passenger for : <span class="text-success"> 4UC</span>
                  </div>

                  <div className='add-details'>
                    <div className='form-control'>
                      <input type="text" placeholder='Name' />
                    </div>

                    <div className='form-control age' >
                      <input type="text" placeholder='Age' />
                    </div>

                    <div className='gemder-wrraper'>
                      <div className='gender-option'>
                        <span className='text'>Male</span>
                        <input type="radio" class="age-radio" name='gender' value='male' />
                      </div>
                      <div className="gender-option">
                        <span className='text'>Female</span>
                        <input type="radio" class="age-radio" name='gender' value='female' />
                      </div>
                    </div>

                  </div>
                  <div className="contact-details">
                    <h6 >Contact Details</h6>
                    <small className="text-grey">Get bus updates and ticket details via WhatsApp and Email</small>
                    <div className="input-container">
                      <div className="passenger-details-mob-input">
                        <span>+91</span>
                        |
                        <input type="text" placeholder='Enter Mobile Number' />
                      </div>
                      <div className="passenger-details-mob-input">
                        <input type="email" placeholder='Enter Emaol Address' />
                      </div>
                    </div>
                  </div>
                </div>

              },
            ]}
          />
        </Space>

        <div className="tnc-wrraper">
          <input type="checkbox" name="" id="" />
          Yes and I accept the <span className='tnc'>Terms and conditions</span>
        </div>

        <div className="pay-btn-wrraper">
          <button className='pay-button'>Continue to Pay ₹ 1833.0
            <div className='arrow-svg'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 626 626"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)', contentVisibility: 'visible' }}
              >
                <defs>
                  <clipPath id="__lottie_element_2">
                    <rect width="626" height="626" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_2)">
                  <g transform="matrix(1,0,0,1,330.54,313)" opacity="1" style={{ display: 'block' }}>
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
                  <g transform="matrix(1,0,0,1,208.24,313)" opacity="0.66" style={{ display: 'block' }}>
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
                  <g transform="matrix(1,0,0,1,84.79,313)" opacity="0.33" style={{ display: 'block' }}>
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
          </button>
        </div>

      </div>

      <div className="right-div">
        <h2>Fare Details</h2>
        <div className="fare" style={{ display: "flex" }}>
          <div className="fare-left">
            <p>Total Fare (inclusive)</p>
            <p>₹149.00</p>
          </div>
          <div className="fare-right">
            <p>Assured Charge </p>
            <p>₹ 1684.20</p>
          </div>
        </div>
        <hr style={{ border: 'none', borderBottom: '1px solid #f2f2f2' }} />
        <div className="fare-bottom">
          <p>Total amount to Paid</p>
          <p>₹ 1833.20</p>
        </div>
      </div>
    </div>

  )
};

export default BookingUI;