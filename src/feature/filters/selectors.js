import { busPartners } from "./data";
import { filterType } from "./slice";

export const getBoardingPoints = (state) => {
  return (
    state.trips?.tripsResponse?.boardingPoints?.map(({ title }) => title) || {}
  );
};

export const getDroppingPoints = (state) => {
  return (
    state.trips?.tripsResponse?.dropingPoints?.map(({ title }) => title) || {}
  );
};

export const getUniqueBusPartners = (state) => {
  return new Set(
    state.trips?.tripsResponse?.trips?.map(({ busPartner }) => busPartner)
  );
};

export const getPriceRange = (state) => {
  const trips = state.trips?.tripsResponse?.trips || [];
  let allPrices = [];
  let minPrices;
  let maxPrices;
  if (trips.length > 0) {
    allPrices = trips.map((trip) => ({
      minPrice: trip.minPrice,
      maxPrice: trip.maxPrice,
    }));

    minPrices = Math.min(...allPrices.map((price) => price.minPrice));
    maxPrices = Math.max(...allPrices.map((price) => price.maxPrice));
  }
  return {
    range: [minPrices, maxPrices],
    selectedRange: [minPrices, maxPrices],
  };
};
