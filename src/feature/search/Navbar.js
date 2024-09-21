import "./styles/SearchBar.scss";
import "./styles/Header.scss";

import React, { useState } from 'react';
// import "./styles/SearchBar.scss";

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Searchinput from './Searchinput';
import { Link } from 'react-router-dom';
import LoginPage from "../auth/LoginPage";



const Navbar = () => {

  const[ toggle, settoggle] = useState(false)


  console.log(toggle)
  // const showLogin = () => {

  // }



  return (
    <header className='header'>
      <div className='top_navbar'>
        <div className='logo'>
          <img
            src="https://www.visa.com/images/merchantoffers/2021-11/1636390736396.abhibus-logo__1_.png"
            alt="AbhiBus Logo"
          />
        </div>
        <nav>
          <Link to='#'>
            <img src="https://www.abhibus.com/assets/svg/bus.svg" alt="Buses" style={{ width: "30px", marginRight: "15px" }} />
            {/* <DirectionsBusIcon />  */}
            Buses
          </Link>
          <Link to='#'>
            <img src="https://www.abhibus.com/assets/svg/train.svg" alt="Trains" style={{ width: "30px", marginRight: "15px" }} />
            {/* <TrainIcon /> */}
            Trains
          </Link>
          <Link to='#'>
            <img src="https://www.abhibus.com/assets/svg/flight.svg" alt="Flights" style={{ width: "30px", marginRight: "15px" }} />
            {/* <FlightIcon />  */}
            Flights
          </Link>
          <Link to='#'>
            <img src="https://www.abhibus.com/assets/svg/hotel.svg" alt="Hotels" style={{ width: "30px", marginRight: "15px" }} />
            {/* <HotelIcon />  */}
            Hotels
          </Link>
          <Link to="#">
            <LocalOfferIcon />
            Offers
          </Link>
          <Link to="#">
            <ConfirmationNumberIcon /> Track Ticket
          </Link>
          <Link to="#">
            <HelpOutlineIcon /> Need Help?
          </Link>
        </nav>
        <div className='auth' style={{ color: "#dc635b" }}>
          <Link to='#' style={{ color: "#dc635b", fontSize: "12px" }} onClick={() => settoggle(prev => !prev)}>
            <AccountCircleIcon style={{ color: "#dc635b", }} /> Login
          </Link>/<Link style={{ color: "#dc635b", fontSize: "12px" }} to="#"> Sign Up</Link>
        </div>
      </div>

      {/* <div className="sort_section">
        <div className='sort'>Sort By: </div>
        <button>Price</button>
        <button>Seats</button>
        <button>Ratings</button>
        <button>Arrival Time</button>
        <button>Departure Time</button>
      </div> */}
      {
        toggle && <LoginPage />
      }


    </header>
  );
};

export default Navbar;