import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";

const CitySearch = () => {
  const navigate = useNavigate();

  const handleNavigate = (navigationInfo) => {
    navigate(
      `/trips/search/${navigationInfo.source}/${navigationInfo.sourceId}/${navigationInfo.destination}/${navigationInfo.destinationId}/${navigationInfo.selectedDate}`
    );
  };

  return (
    <div className="search-page">
      <Navbar />
      <div className="desktop-search-component search-container">
        <div className="search-bg-img">
          <div className="search-form-container">
            <h1>Book Bus Tickets</h1>
            <div className="bg-white">
              <SearchBar handleNavigate={handleNavigate} />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-search-component">
        <SearchBarMobile handleNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default CitySearch;
