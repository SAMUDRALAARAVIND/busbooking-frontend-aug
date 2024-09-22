export const tripsStatusSelector = (state) => state.trips.apiStatus;

export const tripsSelector = (state) => {
  const trips = state.trips.tripsResponse
  const filters = state.filters;


  return trips ;
};
