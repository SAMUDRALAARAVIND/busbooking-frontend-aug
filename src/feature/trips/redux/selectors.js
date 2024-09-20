export const tripsStatusSelector = (state) => state.trips.apiStatus;

export const tripsSelector = (state) => {
  const filters = state.filters;

  // state.filters
  // state.trips.tripsResponse
  // TODO: apply filter logic
  return state.trips.tripsResponse;
};
