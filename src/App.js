import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "material-icons/iconfont/material-icons.css";
import LoginPage from "./feature/auth/LoginPage";
import Endpoints from "./network/endpoints";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCity } from "./feature/search/slice";

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

  
const dispatch = useDispatch()


  useEffect(() => {
    console.log("useEffect is running");
    axios.get(Endpoints.CityData)
      .then((response) => {
        dispatch(getAllCity({ data: response.data }));
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyLoadingWrapper Component={Search} />} />
        <Route
          // path="/trips/search/:source/:sourceId/:destionation/:destinationId/:date"
          path="/trips/search/:source/:sourceId/:destionation/:destinationId/:date/:dateId" 
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
