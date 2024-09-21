import { useEffect } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "./slice";
import Endpoints from "../../network/endpoints";

const CitySearch = () => {

  const dispatch= useDispatch()

  useEffect(() => {
    axios.get(Endpoints.CityData)
    .then((response) => {
      dispatch(getAllCity({data:response.data}))
    }).catch(err => console.log(err))
  }, [])

  const city = useSelector((state) => state.search.cities.data)
  console.log(city)

  return (
    <div className="search-page">
      <Navbar />
      <div className="desktop-search-component search-container">
        <div className="search-bg-img">
          <div className="search-form-container">
            <h1>Book Bus Tickets</h1>
            <div className="bg-white">
              <SearchBar city={city} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mobile-search-component">
        <SearchBarMobile city={city} />
      </div> */}
    </div>
  )
};

export default CitySearch;