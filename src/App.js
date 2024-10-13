import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "material-icons/iconfont/material-icons.css";
import LoginPage from "./feature/auth/LoginPage";

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
          // path="/trips/search"
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
