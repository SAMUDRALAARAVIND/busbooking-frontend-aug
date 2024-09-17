import React, { useEffect, useState } from 'react'

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const Searchinput = () => {

    const [todayDate, setTodayDate] = useState("");

    useEffect(() => {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];
      setTodayDate(today);
    }, []);


  return (
    <>
    <div className="input_container">
          <DirectionsBusIcon className="input_icon" />
          <input type="text"  />
        </div>
        <div className="swap_icon">
          <SwapHorizIcon />
        </div>
        <div className="input_container">
          <LocationOnIcon className="input_icon" />
          <input type="text" />
        </div>
        <div className="input_container">
          <CalendarTodayIcon className="input_icon" />
          <input type="date" min={todayDate}/>
        </div>
        <button>Search</button>
    </>
  )
}

export default Searchinput