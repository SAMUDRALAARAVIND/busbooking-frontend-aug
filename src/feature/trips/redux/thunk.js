import Endpoints from "../../../network/endpoints";
import request from "../../../network/request";

import { updateTripsStatus } from "../redux/slice";
import { togglePriceRange } from "../../filters/slice";
export const fetchTripsList = (searchInfo) => {
  return async function (dispatch) {
    dispatch(updateTripsStatus({ status: "pending" }));
    const { success, data } = await request({
      url: Endpoints.tripsList,
      method: "POST",
      data: searchInfo,
    });

    if (success) {
      const priceRange = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
      data?.trips?.forEach((trip) => {
        priceRange[0] > trip.minPrice && (priceRange[0] = trip.minPrice);
        priceRange[1] < trip.maxPrice && (priceRange[1] = trip.maxPrice);
      });

      dispatch(togglePriceRange(priceRange));
      // TODO: integrate api with proper endpoint and test
      dispatch(updateTripsStatus({ status: "success", data: data }));
    } else {
      // some error occured
      dispatch(updateTripsStatus({ status: "error" }));
    }
  };
};
