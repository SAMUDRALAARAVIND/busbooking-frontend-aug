import { filterType, departureTime } from "../../filters/slice";
import { busPartners, cities, boardingPoints, droppingPoints } from "../../filters/data";
import {tripsResponse} from '../data'
import TripsList from "../components/TripsList";
export const tripsStatusSelector = (state) => state.trips.apiStatus;

export const tripsSelector = (state) => {
  const tripslist = state?.trips?.tripsResponse ; 
//  console.log("selcetor", tripslist)
  const filters = state?.filters;
  const mainBoardingPoints = state?.trips?.tripsResponse?.boardingPoints || [];
  const mainDroppingPoints = state?.trips?.tripsResponse?.dropingPoints || [];
  console.log("filters", filters);

  // filtering Trips Data
  const filteredTrips = tripslist.trips
    .filter((trip) => {
      const busTypes = Object.keys(filters[filterType.BUS_TYPES]).filter(
        (key) => filters[filterType.BUS_TYPES][key]
      );
      if (busTypes.length === 0) return tripslist; 
      return busTypes.includes(trip.busType);
    })
    .filter((trip) => {
      const [min, max] = filters[filterType.PRICE_RANGE].selectedRange || [0, Infinity];
      return trip.maxPrice >= min && trip.minPrice <= max;
    })
    .filter((trip) => {
      const selectedPartners = busPartners.filter(partner => filters[filterType.BUS_PARTNER][partner]);
      if (selectedPartners.length === 0) return true; 
      return selectedPartners.includes(trip.busPartner);
    })
    .filter((trip) => {
      const selectedBoardingPoints = filters[filterType.BOARDING_POINTS];
      if (Object.keys(selectedBoardingPoints).length === 0) return true; 
 const  mainBoardingPoints = state?.trips?.tripsResponse.boardingPoints
     
      const sourceStops = trip?.boardingPoints ?? [];
      return sourceStops.some((stop) => {
        const mainStop = mainBoardingPoints.find(point => point.stopId === stop.stopId);
        
        return mainStop && selectedBoardingPoints[mainStop.stopId];
      });
    })
    .filter((trip) => {
      const selectedDroppingPoints = filters[filterType.DROPPING_POINTS];
      if (Object.keys(selectedDroppingPoints).length === 0) return true; 
      const  mainDroppingPoints = state?.trips?.tripsResponse.droppingPoints

  // drropping points
      const destinationStops = trip?.droppingPoints ?? [];
      return destinationStops.some((stop) => {
        const mainStop = mainDroppingPoints.find(point => point.stopId === stop.stopId);
        return mainStop && selectedDroppingPoints[mainStop.stopId]; 
      });
    })
    .filter((trip) => {
      const selectedDepartureTimes = Object.keys(filters[filterType.DEPARTURE_TIME]).filter(
        (key) => filters[filterType.DEPARTURE_TIME][key]
      );
      if (selectedDepartureTimes.length === 0) return true; 

      const date = new Date(window.location.href.split("/").slice(-1)[0]);
      console.log("date", date )
      const time10AM = new Date(date).setHours(10, 0, 0, 0);
      const time5PM = new Date(date).setHours(17, 0, 0, 0);
      const time11PM = new Date(date).setHours(23, 0, 0, 0);

      let filtered = false;
      trip?.boardingPoints?.forEach((stop) => {
        const arrivalTime = stop.arrivalTime;
        if (selectedDepartureTimes.includes(departureTime.MORNING)) {
          filtered ||= arrivalTime <= time10AM;
        }
        if (selectedDepartureTimes.includes(departureTime.AFTERNOON)) {
          filtered ||= arrivalTime >= time10AM && arrivalTime <= time5PM;
        }
        if (selectedDepartureTimes.includes(departureTime.EVENING)) {
          filtered ||= arrivalTime >= time5PM && arrivalTime <= time11PM;
        }
        if (selectedDepartureTimes.includes(departureTime.NIGHT)) {
          filtered ||= arrivalTime >= time11PM;
        }
      });

      return filtered;
    });
  

  
    return {
      filteredTrips: filteredTrips.length > 0 ? filteredTrips : tripslist.trips,
      mainBoardingPoints,
      mainDroppingPoints,
    };

};
