import React from 'react'
import TripsSlice from "../Components/Trip.js"
import Filters from "../Components/features/Filters.js"
function TripPage() {
  return (
    <div className='flex'>
      <Filters/>
      <TripsSlice/>

    </div>
  )
}

export default TripPage