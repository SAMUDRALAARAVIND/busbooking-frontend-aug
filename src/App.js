import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./feature/auth/Component/LoginPage";
import SignUpPage from "./feature/auth/Component/SignUpPage";
const Search = lazy(() => import("./feature/search/index"));
const TripsScreen = lazy(() => import("./feature/trips/index"));
const BookingScreen = lazy(() => import("./feature/booking/index"));

const LazyLoadingWrapper = ({ Component }) => {
  return <Suspense fallback={<h1>Loading ...</h1>}>{<Component />}</Suspense>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="" element={<LazyLoadingWrapper Component={Search} />} /> */}
        <Route
          // path="/trips/search/:source/:sourceId/:destionation/:destinationId"
          path="/"
          element={<LazyLoadingWrapper Component={TripsScreen} />}
        />
        <Route
          path="/book"
          element={<LazyLoadingWrapper Component={BookingScreen} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
