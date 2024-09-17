import Navbar from "./Navbar";
// import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";

const CitySearch = () => {
  return (
    <div className="search-page">
      <Navbar />
      <div className="desktop-search-component search-container">
        <div className="search-bg-img">
          <div className="search-form-container">
            <h1>Book Bus Tickets</h1>
            {/* <div className="bg-white">
              <SearchBar />
            </div> */}
          </div>
        </div>
      </div>
      <div className="mobile-search-component">
        <SearchBarMobile />
      </div>
    </div>
  );
};

export default CitySearch;
