import React, { useState } from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import AirIcon from '@mui/icons-material/Air';
import EventSeatIcon from '@mui/icons-material/EventSeat';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import NightsStayIcon from '@mui/icons-material/NightsStay';



import { ExpandMore } from '@mui/icons-material';

import { Box, Slider } from '@mui/material';

import './filter.scss';

const Filters = () => {

  
  const [priceRange, setPriceRange] = useState([450, 3500]);
  
  const [showBusPartner, setShowBusPartner] = useState(false);
  const [showBoardingPoint, setShowBoardingPoint] = useState(false);
  const [showDroppingPoint, setShowDroppingPoint] = useState(false);

  const [filter, setfilter] = useState({
    priceDrop: false,
    busType: {
      AC: false,
      Sleeper: false,
      NonAC: false,
      Seater: false
    }
  })

  const [selectedDepartureTime, setSelectedDepartureTime] = useState({
    before10am: false,
    between10amAnd5pm: false,
    between5pmAnd11pm: false,
    after11pm: false,
});



  const toggleDropDown = (setValue) => {
      setValue(prevState => !prevState);
  };


  const handleChange = (event, newValue) => {
      setPriceRange(newValue);
  }



  return (
    <>
      <aside className='sidebar'>
        <div className='filter'>
          <h4>Filters</h4>
          <div className="line_divider"></div>

          <div className='filter_section price_drop'>
            <label htmlFor='priceDrop'>Price Drop</label>
            <input id='priceDrop' type="checkbox"
              onChange={(e) => setfilter({ ...filter, priceDrop: e.target.checked })} />
          </div>
          <div className=' bustype'>
            <label className='bustypekabel' >Bus Type</label>
            <div className='innersection'>
              <div className='checkeditem' >
                <label htmlFor="AC">
                  <input
                    id='AC'
                    type='checkbox'
                    checked={filter.busType.AC}
                    onChange={(e) =>
                      setfilter({
                        ...filter,
                        busType: { ...filter.busType, AC: e.target.checked },
                      })
                    }
                  />
                  <AcUnitIcon />
                  <span>AC</span>

                </label>
              </div>

              <div className='checkeditem' >
                <label htmlFor="Sleeper">
                  <input
                    id='Sleeper'
                    type='checkbox'
                    checked={filter.busType.Sleeper}
                    onChange={(e) =>
                      setfilter({
                        ...filter,
                        busType: { ...filter.busType, Sleeper: e.target.checked },
                      })
                    }
                  />
                  <AirlineSeatFlatIcon />
                  <span>Sleeper</span>
                </label>
              </div>

              <div className='checkeditem' >
                <label htmlFor="NonAC">
                  <input
                    id='NonAC'
                    type='checkbox'
                    checked={filter.busType.NonAC}
                    onChange={(e) =>
                      setfilter({
                        ...filter,
                        busType: { ...filter.busType, NonAC: e.target.checked },
                      })
                    }
                  />
                  <AirIcon />
                  <span>NonAC</span>
                </label>
              </div>


              <div className='checkeditem' >
                <label htmlFor="Seater">
                  <input
                    id='Seater'
                    type='checkbox'
                    checked={filter.busType.Seater}
                    onChange={(e) =>
                      setfilter({
                        ...filter,
                        busType: { ...filter.busType, Seater: e.target.checked },
                      })
                    }
                  />
                  <EventSeatIcon />
                  <span>Sleeper</span>
                </label>
              </div>
            </div>
          </div>
          <div className='filter_section'>
            <label>Price Range</label>
            <Box className="price-slider-container">
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
                min={450}
                max={3500}
              />
            </Box>
          </div>
          <div className='upperdeparture'>
            <label className='deparlabel'>Departure Time</label>
            <div className='departure_time_options'>
              <div className='departurecheckeditem' >
                <label htmlFor="before10am">
                  <input
                    id='before10am'
                    type='checkbox'
                    checked={selectedDepartureTime.before10am}
                    onChange={(e) =>
                      setSelectedDepartureTime({
                        ...selectedDepartureTime, before10am: e.target.checked
                      })
                    }
                  />
                  <br />
                  <WbSunnyIcon />


                </label>
                <span>Before 10 AM</span    >
              </div>

              <div className='departurecheckeditem' >
                <label htmlFor="between10amAnd5pm">
                  <input
                    id='between10amAnd5pm'
                    type='checkbox'
                    checked={selectedDepartureTime.between10amAnd5pm}
                    onChange={(e) =>
                      setSelectedDepartureTime({
                        ...selectedDepartureTime, between10amAnd5pm: e.target.checked
                      })}
                  />
                  <Brightness6Icon />
                </label>
                <span>10 AM - 5 PM</span    >
              </div>

              <div className='departurecheckeditem' >
                <label htmlFor="between5pmAnd11pm">
                  <input
                    id='between5pmAnd11pm'
                    type='checkbox'
                    checked={selectedDepartureTime.between5pmAnd11pm}

                    onChange={(e) =>
                      setSelectedDepartureTime({
                        ...selectedDepartureTime, between5pmAnd11pm: e.target.checked
                      })}
                  />
                  <WbSunnyIcon />
                </label>
                <span>5 PM - 11 PM</span    >
              </div>

              <div className='departurecheckeditem' >
                <label htmlFor="after11pm">
                  <input
                    id='after11pm'
                    type='checkbox'
                    checked={selectedDepartureTime.after11pm}
                    onChange={(e) =>
                      setSelectedDepartureTime({
                        ...selectedDepartureTime, after11pm: e.target.checked
                      })}
                  />
                  <NightsStayIcon />
                </label>
                <span>After 11 PM</span    >
              </div>
            </div>
          </div>
          <div className="filter_section dropdown">
            <div className='dropdown_container'>
              <label>Bus Partner</label>
              <ExpandMore className="dropdown_icon" onClick={() => toggleDropDown(setShowBusPartner)} />
            </div>
            {showBusPartner && (
              <div className='dropdown_content'>
                <input type='text' placeholder='Search..' className='search_bar' />
                <div className='checkbox_group'>
                  <label>
                    <input type='checkbox' />
                    Partner 1
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 2
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 3
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 4
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 5
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_section dropdown">
            <div className='dropdown_container'>
              <label>Boarding Point</label>
              <ExpandMore className="dropdown_icon" onClick={() => toggleDropDown(setShowBoardingPoint)} />
            </div>
            {showBoardingPoint && (
              <div className='dropdown_content'>
                <input type='text' placeholder='Search..' className='search_bar' />
                <div className='checkbox_group'>
                  <label>
                    <input type='checkbox' />
                    Partner 1
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 2
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 3
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 4
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 5
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_section dropdown">
            <div className='dropdown_container'>
              <label>Dropping Point</label>
              <ExpandMore className="dropdown_icon" onClick={() => toggleDropDown(setShowDroppingPoint)} />
            </div>
            {showDroppingPoint && (
              <div className='dropdown_content'>
                <input type='text' placeholder='Search..' className='search_bar' />
                <div className='checkbox_group'>
                  <label>
                    <input type='checkbox' />
                    Partner 1
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 2
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 3
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 4
                  </label>
                  <label>
                    <input type='checkbox' />
                    Partner 5
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
};

export default Filters;
