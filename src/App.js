import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "material-icons/iconfont/material-icons.css";
import LoginPage from "./feature/auth/LoginPage";
import Signup from "./feature/auth/Signup";
const Otp = lazy(() => import("./feature/auth/Otp"));
const Search = lazy(() => import("./feature/search/index"));
const TripsScreen = lazy(() => import("./feature/trips/index"));
const BookingScreen = lazy(() => import("./feature/booking/index"));

const LazyLoadingWrapper = ({ Component }) => {
  return (
    <Suspense fallback={<h1>Loading ...</h1>}>
      <Component />
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyLoadingWrapper Component={Search} />} />
        <Route
          path="/trips/search/:source/:sourceCityId/:destination/:destinationCityId/:travelDate"
          element={<LazyLoadingWrapper Component={TripsScreen} />}
        />
        <Route
          path="/book"
          element={<LazyLoadingWrapper Component={BookingScreen} />}
        />
        <Route
          path="/login"
          element={<LazyLoadingWrapper Component={LoginPage} />}
        />
        <Route
          path="/Signup"
          element={<LazyLoadingWrapper Component={Signup} />}
        />
        <Route path="/otp" element={<LazyLoadingWrapper Component={Otp} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
