import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { toggleBusTiming, toggleBusType, togglePriceDrop } from './slice';

const Filters = () => {


  const [priceRange, setPriceRange] = useState([450, 3500]);
  const [showBusPartner, setShowBusPartner] = useState(false);
  const [showBoardingPoint, setShowBoardingPoint] = useState(false);
  const [showDroppingPoint, setShowDroppingPoint] = useState(false);
  const [Dropdownsvalue, setDropdownsvalue] = useState({
    dropbusPartners: '',
    BoardingPoint: '',
    dropingPoints: ''
  })

  const dispatch = useDispatch()

  const data = useSelector((state) => state.filters)

  const busPartners = useSelector((state) => state.filters.busPartners || [])
  const boardingPoints = useSelector((state) => state.filters.cities || [])
  const dropingPoints = useSelector((state) => state.filters.cities || [])


  const partnersss = busPartners.filter(partner =>
    partner.toLowerCase().includes(Dropdownsvalue.dropbusPartners?.toLowerCase() || '')
  )

  const boardingPointss = boardingPoints.filter(city =>
    city.toLowerCase().includes(Dropdownsvalue.BoardingPoint.toLowerCase() || '')
  )


  const dropingPointss = dropingPoints.filter((city) =>
    city.toLowerCase().includes(Dropdownsvalue.dropingPoints.toLowerCase() || '')
  )


  const handleSearchChange = (e) => {
    setDropdownsvalue(prevState => ({
      ...prevState,
      dropbusPartners: e.target.value
    }));
  };

  const handleCityChange = (e) => {
    setDropdownsvalue(prevState => ({
      ...prevState,
      BoardingPoint: e.target.value
    }));
  };

  const handleDropingChange = (e) => {
    setDropdownsvalue(prevState => ({
      ...prevState, 
      dropingPoints: e.target.value
    }))
  }



  useEffect(() => {
    console.log('Updated filters state:', Dropdownsvalue);
  }, [Dropdownsvalue]);

  const toggleDropDown = (setValue) => {
    setValue(prevState => !prevState);
  };


  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  }

  const handlebusChange = (e) => {
    console.log(e.target.checked)
    const { id, checked } = e.target;
    dispatch(toggleBusType({ type: id, checked: checked }));
  }

  const handelDepartureTime = (e) => {
    const { id, checked } = e.target;
    dispatch(toggleBusTiming({ type: id, checked: checked }));
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
              onChange={((e) => dispatch(togglePriceDrop(e.target.checked)))}
            />
          </div>
          <div className=' bustype'>
            <label className='bustypekabel' >Bus Type</label>
            <div className='innersection'>
              <div className='checkeditem' >
                <label htmlFor="AC">
                  <input
                    id='AC'
                    type='checkbox'
                    checked={data.busType.AC}
                    onChange={handlebusChange}
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
                    checked={data.busType.Sleeper}
                    onChange={handlebusChange}
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
                    checked={data.busType.NonAC}
                    onChange={handlebusChange}
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
                    checked={data.busType.Seater}
                    onChange={handlebusChange}
                  />
                  <EventSeatIcon />
                  <span>Seater</span>
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
                    checked={data.busTiming.before10am}
                    onChange={handelDepartureTime}
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
                    checked={data.busTiming.between10amAnd5pm}
                    onChange={handelDepartureTime}
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
                    checked={data.busTiming.between5pmAnd11pm}
                    onChange={handelDepartureTime}
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
                    checked={data.busTiming.after11pm}
                    onChange={handelDepartureTime}
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
                <input
                  type='text'
                  placeholder='Search..'
                  className='search_bar'
                  value={Dropdownsvalue.dropbusPartners}
                  onChange={handleSearchChange}
                />

                <div className='checkbox_group'>
                  {
                    partnersss && partnersss.map(
                      (bus, index) => (
                        <div className='insidecheckgroup'>
                          <label key={index} htmlFor={bus}> {bus} </label>
                          <input id={bus} type='checkbox' />
                        </div>

                      )
                    )
                  }
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
                <input
                  type='text'
                  placeholder='Search..'
                  className='search_bar'
                  value={Dropdownsvalue.BoardingPoint}
                  onChange={handleCityChange}
                />
                <div className='checkbox_group'>
                  {
                    boardingPointss && boardingPointss.map(
                      (bus, index) => (
                        <div className='insidecheckgroup'>
                          <label key={index} htmlFor={bus}> {bus} </label>
                          <input id={bus} type='checkbox' />
                        </div>
                      )
                    )
                  }
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
                <input
                  type='text'
                  placeholder='Search..'
                  className='search_bar'
                  value={Dropdownsvalue.dropingPoints}
                  onChange={handleDropingChange}
                />
                <div className='checkbox_group'>
                  {
                    dropingPointss && dropingPointss.map(
                      (bus, index) => (
                        <div className='insidecheckgroup'>
                          <label key={index} htmlFor={bus}> {bus} </label>
                          <input id={bus} type='checkbox' />
                        </div>
                      )
                    )
                  }
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
