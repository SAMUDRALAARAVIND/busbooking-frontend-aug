import { filterType, departureTime } from "../../filters/slice";
import { busPartners, cities, boardingPoints, droppingPoints } from "../../filters/enum";
import TripsList from "../components/TripsList";
import { createSelector } from "reselect";


export const tripsStatusSelector = (state) => state.trips.apiStatus;
const tripsResponseSelector = (state) => state?.trips?.tripsResponse;
const filtersSelector = (state) => state?.filters;

export const tripsSelector = createSelector(
  [tripsResponseSelector, filtersSelector],
(tripsResponseSelector, filtersSelector) => {

  const mainBoardingPoints = tripsResponseSelector?.boardingPoints || [];
  const mainDroppingPoints = tripsResponseSelector?.dropingPoints || [];

  console.log("filtersSelector", filtersSelector)
  // filtering Trips Data
  const filteredTrips = tripsResponseSelector?.trips
    .filter((trip) => {
      const busTypes = Object.keys(filtersSelector[filterType.BUS_TYPES]).filter(
        (key) => filtersSelector[filterType.BUS_TYPES][key]
      );
      if (busTypes.length === 0) return true;
      return busTypes.includes(trip.busType);
    })
    .filter((trip) => {
      const [min, max] = filtersSelector[filterType.PRICE_RANGE].selectedRange || [
        0,
        Infinity,
      ];
      return trip.maxPrice >= min && trip.minPrice <= max;
    })
    .filter((trip) => {
      const selectedPartners = busPartners.filter(
        (partner) => filtersSelector[filterType.BUS_PARTNER][partner]
      );
      if (selectedPartners.length === 0) return true;
      return selectedPartners.includes(trip.busPartner);
    })
    .filter((trip) => {
      const selectedBoardingPoints = filtersSelector[filterType.BOARDING_POINTS];
      if (Object.keys(selectedBoardingPoints).length === 0) return true;
      // const mainBoardingPoints = state?.trips?.tripsResponse.boardingPoints;
      const sourceStops = trip?.boardingPoints ?? [];
      return sourceStops.some((stop) => {
        const mainStop = mainBoardingPoints.find(
          (point) => point.stopId === stop.stopId
        );
        return mainStop && selectedBoardingPoints[mainStop.stopId];
      });
    })
    .filter((trip) => {
      const selectedDroppingPoints = filtersSelector[filterType.DROPPING_POINTS];
      if (Object.keys(selectedDroppingPoints).length === 0) return true;

  // drropping points
      const destinationStops = trip?.droppingPoints ?? [];
      return destinationStops?.some((stop) => {
        const mainStop = mainDroppingPoints.find(
          (point) => point.stopId === stop.stopId
        );
        return mainStop && selectedDroppingPoints[mainStop.stopId];
      });
    })
    .filter((trip) => {
        const selectedDepartureTimes = Object.keys(
          filtersSelector[filterType.DEPARTURE_TIME]  ).filter((key) => filtersSelector[filterType.DEPARTURE_TIME][key]);
        if (selectedDepartureTimes.length === 0) return true;
        const date = new Date((window.location.href.split("/").slice(-1)[0])*1000);
        const time10AM = new Date(date).setHours(10, 0, 0, 0);
        const time5PM = new Date(date).setHours(17, 0, 0, 0);
        const time11PM = new Date(date).setHours(23, 0, 0, 0);
        let filtered = false;
        trip?.boardingPoints?.forEach((stop) => {
          const arrivalTime = stop.arrivalTime;
          if (selectedDepartureTimes.includes(departureTime.MORNING)) {
            filtered ||= arrivalTime <= (time10AM/1000) ;
          }
          if (selectedDepartureTimes.includes(departureTime.AFTERNOON)) {
            filtered ||= arrivalTime >= (time10AM/1000) && arrivalTime <= (time5PM/1000);
          }
          if (selectedDepartureTimes.includes(departureTime.EVENING)) {
            filtered ||= arrivalTime >= (time5PM/1000) && arrivalTime <= (time11PM/1000);
          }
          if (selectedDepartureTimes.includes(departureTime.NIGHT)) {
            filtered ||= arrivalTime >= (time11PM/1000) ;
          }
        });
  console.log("filtered", filtered)
        return filtered;
      });
    console.log("tripsResponse", filteredTrips)
    return {
      filteredTrips: filteredTrips?.length > 0 ?  filteredTrips : tripsResponseSelector?.trips,
      mainBoardingPoints,
      mainDroppingPoints,
    };

  }
)