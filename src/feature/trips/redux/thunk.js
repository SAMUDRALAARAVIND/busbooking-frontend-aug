import Endpoints from "../../../network/endpoints";
import request from "../../../network/request";
import { tripsResponse } from "../data";
import { updateTripsStatus } from "../redux/slice";

export const fetchTripsList = (searchInfo) => {
  return async function (dispatch) {
    dispatch(updateTripsStatus({ status: "pending" }));

    const { success, data } = await request({
      url: Endpoints.tripsList,
      method: "POST",
      data: searchInfo,
    });
    if (success) {
      // we received response
      // TODO: integrate api with proper endpoint and test
      dispatch(updateTripsStatus({ status: "success", data: data }));
    } else {
      // some error occured
      dispatch(updateTripsStatus({ status: "error" }));
    }
  };
};
