//
import { createSelector } from "reselect";
import { filterType } from "./slice";

export const getBoardingPoints = createSelector(
  (state) => state.trips?.tripsResponse?.boardingPoints,
  (boardingPoints) => boardingPoints?.map(({ title }) => title) || {}
);
// export const getBoardingPoints = (state) => {
//   return state.trips?.tripsResponse?.boardingPoints?.map(({ title }) => title);
// };

export const getDroppingPoints = createSelector(
  (state) => state.trips?.tripsResponse?.dropingPoints,
  (dropingPoints) => dropingPoints?.map(({ title }) => title) || {}
);

export const getUniqueBusPartners = createSelector(
  (state) => state.trips?.tripsResponse?.trips,
  (trips) => {
    const partners = trips?.map(({ busPartner }) => busPartner);
    return new Set(partners);
  }
);

// Memoized Selector for Price Range
export const getPriceRange = createSelector(
  (state) => state.trips?.tripsResponse?.trips || [],
  (trips) => {
    if (trips.length === 0) return { range: [0, 0], selectedRange: [0, 0] };

    let allPrices = trips.map((trip) => ({
      minPrice: trip.minPrice,
      maxPrice: trip.maxPrice,
    }));

    const minPrices = Math.min(...allPrices.map((price) => price.minPrice));
    const maxPrices = Math.max(...allPrices.map((price) => price.maxPrice));

    return {
      range: [minPrices, maxPrices],
      selectedRange: [minPrices, maxPrices],
    };
  }
);
