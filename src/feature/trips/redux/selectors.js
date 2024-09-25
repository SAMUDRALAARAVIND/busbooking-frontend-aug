import { filterType, departureTime } from "../../filters/slice";
import { busPartners } from "../../filters/enum";

export const stopPointsSelector = (state, tripId) => {
  let sourceStops = [],
    destinationStops = [];

  state.trips?.tripsResponse?.trips.forEach((tour) => {
    if (tripId === tour.tripId) {
      sourceStops = tour.boardingPoints || [];
      destinationStops = tour.droppingPoints || [];
    }
  });

  const boardingPoints = state.trips?.tripsResponse?.boardingPoints || [];
  const droppingPoints = state.trips?.tripsResponse?.droppingPoints || [];

  const source = sourceStops
    .map((sourceStop) => {
      const matchedBoardingPoint = boardingPoints.find(
        (bp) => bp.stopId === sourceStop.stopId
      );
      return matchedBoardingPoint
        ? { ...sourceStop, ...matchedBoardingPoint }
        : null;
    })
    .filter(Boolean);

  const dest = destinationStops
    .map((destStop) => {
      const matchedDroppingPoint = droppingPoints.find(
        (dp) => dp.stopId === destStop.stopId
      );
      return matchedDroppingPoint
        ? { ...destStop, ...matchedDroppingPoint }
        : null;
    })
    .filter(Boolean);

  return { boardingPoints: source, droppingPoints: dest };
};

export const tripsStatusSelector = (state) => state.trips.apiStatus;

export const tripsSelector = (state) => {
  const trips = Array.isArray(state?.trips?.tripsResponse.trips)
    ? state.trips.tripsResponse.trips
    : [];

  const filters = state?.filters;

  const filteredTrips = trips
    // Filter by bus types
    .filter((trip) => {
      const busTypes = Object.keys(filters[filterType.BUS_TYPES]).filter(
        (key) => filters[filterType.BUS_TYPES][key]
      );
      if (busTypes.length === 0) return true;
      return busTypes.includes(trip.busType);
    })
    .filter((trip) => {
      const [min, max] = filters[filterType.PRICE_RANGE].selectedRange || [
        0,
        Infinity,
      ];
      return trip.maxPrice >= min && trip.minPrice <= max;
    })
    .filter((trip) => {
      const selectedPartners = busPartners.filter(
        (partner) => filters[filterType.BUS_PARTNER][partner]
      );
      if (selectedPartners.length === 0) return true;
      return selectedPartners.includes(trip.busPartner);
    })
    .filter((trip) => {
      const selectedBoardingPoints = filters[filterType.BOARDING_POINTS];
      if (Object.keys(selectedBoardingPoints).length === 0) return true;
      const mainBoardingPoints = state?.trips?.tripsResponse.boardingPoints;
      // Compare with main boarding points
      const sourceStops = trip?.boardingPoints ?? [];
      return sourceStops.some((stop) => {
        const mainStop = mainBoardingPoints.find(
          (point) => point.stopId === stop.stopId
        );

        return mainStop && selectedBoardingPoints[mainStop.stopId];
      });
    })
    .filter((trip) => {
      const selectedDroppingPoints = filters[filterType.DROPPING_POINTS];
      if (Object.keys(selectedDroppingPoints).length === 0) return true;
      const mainDroppingPoints = state?.trips?.tripsResponse.droppingPoints;

      // Compare with main dropping points
      const destinationStops = trip?.droppingPoints ?? [];
      return destinationStops.some((stop) => {
        const mainStop = mainDroppingPoints.find(
          (point) => point.stopId === stop.stopId
        );
        return mainStop && selectedDroppingPoints[mainStop.stopId];
      });
    })
    .filter((trip) => {
      const selectedDepartureTimes = Object.keys(
        filters[filterType.DEPARTURE_TIME]
      ).filter((key) => filters[filterType.DEPARTURE_TIME][key]);
      if (selectedDepartureTimes.length === 0) return true;

      const date = new Date(window.location.href.split("/").slice(-1)[0]);
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

  return filteredTrips.length > 0 ? filteredTrips : trips;
};
