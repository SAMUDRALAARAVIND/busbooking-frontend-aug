import Endpoints from "../../network/endpoints";
import request from "../../network/request";
import { updateCitiesList, updateCitiesStatus } from "./slice";

export const fetchCitiesList = () => {
  return async function (dispatch) {
    dispatch(updateCitiesStatus({ status: "pending" }));

    console.log("inside fetch cities list");

    try {
      const { success, data } = await request({
        url: Endpoints.citiesApi,
        method: "GET",
      });

      console.log(data, "in thunk");
      if (success) {
        dispatch(updateCitiesList({ cities: data.cities }));
        dispatch(updateCitiesStatus({ status: "success" }));
      } else {
        dispatch(updateCitiesStatus({ status: "error" }));
      }
    } catch (error) {
      dispatch(updateCitiesStatus({ status: "error" }));
    }
  };
};
