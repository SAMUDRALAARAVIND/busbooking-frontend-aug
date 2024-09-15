import React from 'react'
import Filters from '../feature/filters'
import TripsScreen from '../feature/trips'
const TripsPage = () => {
  return (
    <div className='trips-page flex'>
<Filters/>
<TripsScreen/>
    </div>
  )
}

export default TripsPage