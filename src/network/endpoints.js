// const baseUrl = "http://localhost:8080";
const baseUrl = "https://travelbybus.onrender.com";

const Endpoints = {
  searchCities: `${baseUrl}/city/cities`,
  tripsList: `${baseUrl}/api/trips/details`,
  seatLayout: `${baseUrl}/api/seat/layout`,
  booking: `${baseUrl}/booking/book`,
  login: `${baseUrl}/auth/login`
};

export default Endpoints;
