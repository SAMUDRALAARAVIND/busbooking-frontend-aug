// import axios from "axios";
import Endpoints from "../../network/endpoints";
import request from "../../network/request";
// import { tripsResponse } from "./data";
import { updateTripsStatus } from "./slice";

export const fetchTripsList = (searchInfo) => {
  return async function (dispatch) {
    dispatch(updateTripsStatus({ status: "pending" }));
    try {
      const { success, data } = await request({
        url: Endpoints.tripsList,
        method: "POST",
        data: searchInfo,
      });
      if (success) {
        // we received response
        // TODO: integrate api with proper endpoint and testwwww
  
        
  
        dispatch(updateTripsStatus({ status: "success", data: data }));
      } else {
        // some error occured
        dispatch(updateTripsStatus({ status: "error" }));
      }
    } catch (error) {
      dispatch(updateTripsStatus({ status: 'error', error: error.message }));
    }
    
  };
};
