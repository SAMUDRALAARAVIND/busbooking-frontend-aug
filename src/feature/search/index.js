import { useEffect } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "./slice";

const CitySearch = () => {

  const dispatch= useDispatch()

  useEffect(() => {
    axios.get("http://localhost:8000/city/cities")
    .then((response) => {
      dispatch(getAllCity({data:response.data}))
      console.log(response.data)
    } )
  }, [])

  const city = useSelector((state) => state.search.cities.data)
  console.log()

  return (
    <div className="search-page">
      <Navbar />
      <div className="desktop-search-component search-container">
        <div className="search-bg-img">
          <div className="search-form-container">
            <h1>Book Bus Tickets</h1>
            <div className="bg-white">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-search-component">
        <SearchBarMobile />
      </div>
    </div>
  )
};

export default CitySearch;