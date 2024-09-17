import React from 'react';
// import "./styles/SearchBar.scss";

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Searchinput from './Searchinput';
import { Link } from 'react-router-dom';

import './styles/Header.scss'


const Navbar = () => {
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
            <DirectionsBusIcon /> Buses
          </Link>
          <Link to='#'>
            <TrainIcon /> Trains
          </Link>
          <Link to='#'>
            <FlightIcon /> Flights
          </Link>
          <Link to='#'>
            <HotelIcon /> Hotels
          </Link>
          <Link to="#">
            <LocalOfferIcon /> Offers
          </Link>
          <Link to="#">
            <ConfirmationNumberIcon /> Track Ticket
          </Link>
          <Link to="#">
            <HelpOutlineIcon /> Need Help?
          </Link>
        </nav>
        <div className='auth'>
          <Link to='#'>
            <AccountCircleIcon /> Login
          </Link> / <Link to="#">Sign Up</Link>
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
    </header>
  );
};

export default Navbar;
