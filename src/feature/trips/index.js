import React from 'react'
import Filters from '../filters'
import TripsCard from './components/tripsCard'
const TripsScreen = () => {
  return (
    <div className='trips-screen flex'>
<Filters/>
<TripsCard/>
    </div>
  )
}

export default TripsScreen