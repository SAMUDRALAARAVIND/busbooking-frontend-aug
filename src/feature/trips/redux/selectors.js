import { filterType, departureTime } from "../../filters/slice";
import { createSelector } from "reselect";

export const tripsStatusSelector = (state) => state.trips.apiStatus;
const tripsResponseSelector = (state) => state?.trips?.tripsResponse;
const filtersSelector = (state) => state?.filters;
const travelDateSelector = (state) => state.search.date;

export const allTripsSelector = (state) => {
  return state.trips?.tripsResponse?.trips ?? [];
};
export const tripsSelector = createSelector(
  [tripsResponseSelector, filtersSelector, travelDateSelector],
  (tripsResponseSelector, filtersSelector, travelDate) => {
    // convert travelDate into millis
    travelDate *= 1000;
    const mainBoardingPoints = tripsResponseSelector?.boardingPoints || [];
    const mainDroppingPoints = tripsResponseSelector?.dropingPoints || [];

    const filteredTrips = tripsResponseSelector?.trips
      .filter((trip) => {
        // { NON_AC: true, AC: true }
        const busTypes = Object.keys(filtersSelector[filterType.BUS_TYPES]);
        if (busTypes.length === 0) return true;
        return busTypes.includes(trip.busType);
      })
      .filter((trip) => {
        const [min, max] =
          filtersSelector[filterType.PRICE_RANGE].selectedRange;
        return !(min > trip.maxPrice || max <= trip.minPrice);
      })
      .filter((trip) => {
        const selectedPartners = filtersSelector[filterType.BUS_PARTNER];
        if (Object.keys(selectedPartners).length === 0) return true;
        return selectedPartners[trip.busPartner];
      })
      .filter((trip) => {
        const selectedBoardingPoints =
          filtersSelector[filterType.BOARDING_POINTS];
        if (Object.keys(selectedBoardingPoints).length === 0) return true;
        let isFiltered = false;
        trip.boardingPoints?.forEach((boardingPoint) => {
          if (selectedBoardingPoints[boardingPoint.stopId]) {
            isFiltered = true;
          }
        });
        return isFiltered;
      })
      .filter((trip) => {
        const selectedDroppingPoints =
          filtersSelector[filterType.DROPPING_POINTS];
        if (Object.keys(selectedDroppingPoints).length === 0) return true;

        let isFiltered = false;
        trip.droppingPoints?.forEach((droppingPoint) => {
          if (selectedDroppingPoints[droppingPoint.stopId]) {
            isFiltered = true;
          }
        });
        return isFiltered;
      })
      .filter((trip) => {
        const selectedDepartureTimes =
          filtersSelector[filterType.DEPARTURE_TIME];
        // converting epoch in seconds to millis
        if (
          !selectedDepartureTimes[departureTime.AFTERNOON] &&
          !selectedDepartureTimes[departureTime.EVENING] &&
          !selectedDepartureTimes[departureTime.MORNING] &&
          !selectedDepartureTimes[departureTime.NIGHT]
        ) {
          return true;
        }
        const time10AM = new Date(travelDate).setHours(10, 0, 0, 0);
        const time5PM = new Date(travelDate).setHours(17, 0, 0, 0);
        const time11PM = new Date(travelDate).setHours(23, 0, 0, 0);

        const busDepartureTimeInMillis = trip.departureTime * 1000;

        let isFiltered = false;

        if (
          selectedDepartureTimes[departureTime.MORNING] &&
          busDepartureTimeInMillis <= time10AM
        ) {
          isFiltered = true;
        }
        if (
          selectedDepartureTimes[departureTime.AFTERNOON] &&
          busDepartureTimeInMillis >= time10AM &&
          busDepartureTimeInMillis <= time5PM
        ) {
          isFiltered = true;
        }
        if (
          selectedDepartureTimes[departureTime.EVENING] &&
          busDepartureTimeInMillis >= time5PM &&
          busDepartureTimeInMillis <= time11PM
        ) {
          isFiltered = true;
        }
        if (
          selectedDepartureTimes[departureTime.NIGHT] &&
          busDepartureTimeInMillis >= time11PM
        ) {
          isFiltered = true;
        }

        return isFiltered;
      });

    return {
      filteredTrips,
      mainBoardingPoints,
      mainDroppingPoints,
    };
  }
);
