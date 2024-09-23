import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./styles/SearchBar.scss";
import "./styles/Header.scss";
// import "./styles/SearchBar.scss";

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginPage from '../auth/LoginPage';
import SignUpPage from '../auth/SignUp';
import Modal from '../auth';
// import Searchinput from './Searchinput';



const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const handleSignupClick = () => {
    setLogin(false);
    setModalOpen(true);
  };

  const handleLoginClick = () => {
    setLogin(true);
    setModalOpen(true);
  };

  const handleSignUpSuccess = () => {
    setLogin(true);
    setModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setLogin(false);
    setModalOpen(false);
  };

  const modalHeight = isLogin ? '500px' : '550px';

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
          <Link to='#' onClick={handleLoginClick} style={{ color: "#dc635b", fontSize: "12px" }}>
            <AccountCircleIcon style={{ color: "#dc635b", }} /> Login
          </Link>/<Link to='#' onClick={handleSignupClick} style={{ color: "#dc635b", fontSize: "12px" }} > Sign Up</Link>
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

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} height={modalHeight}>
        {isLogin ? <LoginPage onLoginClick={handleLoginSuccess} onSignUpClick={handleSignupClick}/> : <SignUpPage onLoginClick={handleSignUpSuccess} />}
      </Modal>

    </header>
  );
};

export default Navbar;