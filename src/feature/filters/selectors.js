import { createSelector } from "reselect";
import { filterType } from "./slice";

export const boardingDroppingPointsSelector = createSelector(
  (state) => state?.trips?.tripsResponse || {},
  (tripsResponse) => {
    const { boardingPoints = [], dropingPoints = [] } = tripsResponse;
    return { boardingPoints, dropingPoints };
  }
);

export const busPartnerSelector = createSelector(
  (state) => state.trips?.tripsResponse?.trips,
  (trips) => {
    const partners = trips?.map(({ busPartner }) => busPartner);
    return new Set(partners);
  }
);

const filterSelector = (state) => state?.filter;

export const priceRangeSelector = createSelector(
  [filterSelector],
  (filter) => ({
    range: filter?.[filterType.PRICE_RANGE]?.range || [0, 100],
    selectedRange: filter?.[filterType.PRICE_RANGE]?.selectedRange || [0, 100],
  })
);
