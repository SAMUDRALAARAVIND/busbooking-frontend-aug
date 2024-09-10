import { useEffect, useState } from "react";
import "./styles/SearchBar.scss";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  SwapOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CarOutlined,
} from "@ant-design/icons";
import CitiesDiv from "./CitiesDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  addSourceCity,
  addDestinationCity,
  addDate,
} from "./slice";
dayjs.extend(customParseFormat);

function filterCities(type, cities, search) {
  const searchVal = search[type]?.toLowerCase();
  return cities.filter(city => {
    return city?.toLowerCase().includes(searchVal);
  }).filter((city) => {
    if (type === "source") {
      return city.toLowerCase() !== search['destination']?.toLowerCase();
    } else {
      return city.toLowerCase() !== search["source"]?.toLowerCase();
    }
  });
}

const SearchBar = () => {
  const suggestions = useSelector((state) => state);
  const [today, setToday] = useState(dayjs());
  const [showPopOver, setShowPopOver] = useState({
    source: false,
    destination: false,
  });
  const [search, setSearch] = useState({
    source: "",
    destination: "",
  });
  const dispatch = useDispatch();

  const todayDate = dayjs();
  const maxDate = todayDate.add(3, "month");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".source-city-input") &&
        !event.target.closest(".destination-city-input")
      ) {
        setShowPopOver({
          source: false,
          destination: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onDateChange = (date) => {
    setToday(date);
    dispatch(addDate(date.unix()));
  };

  const handleCityClick = (identifier, city) => {
    if (identifier === 'source') {
      dispatch(addSourceCity(city));
      setSearch({
        ...search,
        source: city
      });
    } else {
      dispatch(addDestinationCity(city));
      setSearch({
        ...search,
        destination: city
      });
    }
  };

  const handleTodayClick = () => {
    const todayDate = dayjs(); 
    setToday(todayDate); 
    dispatch(addDate(todayDate.unix())); 
  };

  const handleTomorrowClick = () => {
    const tomorrowDate = dayjs().add(1, "day");
    setToday(tomorrowDate);
    dispatch(addDate(tomorrowDate.unix()));
  };

  const handleCitySwap = () => {
    const swappedSource = search.destination;
    const swappedDestination = search.source;

    setSearch({
      source: swappedSource,
      destination: swappedDestination,
    });

    dispatch(addSourceCity(swappedSource));
    dispatch(addDestinationCity(swappedDestination));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.source && search.destination && today) {
      // Dispatch or call search action here
    } else {
      alert("Please fill in all search fields.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className="search-form-container">
          <h1>Book Bus Tickets</h1>
          <div className="search-form">
            <div
              tabIndex="0"
              className="search-input source-city-input"
              onClick={() => {
                setShowPopOver({
                  source: true,
                  destination: false,
                });
              }}
            >
              <CarOutlined
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  color: "#616161",
                }}
              />
              <input
                type="text"
                name="source-city-input"
                id="source-city-input"
                placeholder="From Station"
                value={search['source']}
                onChange={(e) => {
                  setSearch({ ...search, source: e.target.value });
                }}
              />
            </div>

            <div className="search-swap-icon" onClick={handleCitySwap}>
              <SwapOutlined
                style={{
                  color: "#9B9B9B",
                  backgroundColor: "#EEEEEE",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  fontSize: "24px",
                }}
              />
            </div>

            <div
              tabIndex="0"
              className="search-input destination-city-input"
              onClick={() => {
                setShowPopOver({
                  destination: true,
                  source: false,
                });
              }}
            >
              <EnvironmentOutlined
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  color: "#616161",
                }}
              />
              <input
                type="text"
                name="destination-city-input"
                id="destination-city-input"
                placeholder="To Station"
                value={search['destination']}
                onChange={(e) => {
                  setSearch({ ...search, destination: e.target.value });
                }}
              />
            </div>

            <div className="search-date search-input">
              <div className="datePicker">
                <CalendarOutlined
                  style={{
                    color: "#BFBFBF",
                    fontSize: "larger",
                    fontWeight: "500",
                    position: "relative",
                    top: "0.3rem",
                    marginRight: "5px",
                  }}
                />
                <DatePicker
                  defaultValue={suggestions.search.date ? dayjs.unix(suggestions.search.date) : today}
                  value={suggestions.search.date ? dayjs.unix(suggestions.search.date) : today}
                  disableDate={(current) => {
                    return current && current < todayDate.startOf("day");
                  }}
                  minDate={todayDate}
                  maxDate={maxDate}
                  onChange={onDateChange}
                />
              </div>
              <div className="today-tomorrow-btn">
                <button type="button" onClick={handleTodayClick}>
                  Today
                </button>
                <button type="button" onClick={handleTomorrowClick}>
                  Tomorrow
                </button>
              </div>
            </div>
            <button className="search-button">Search</button>
          </div>
        </div>
      </form>

      <div className="source-city-div city-div">
        {showPopOver.source && (
          <div className="search-city-div">
            {filterCities('source', suggestions.search.cities, search)
              .map((city, index) => {
                return <CitiesDiv key={index} city={city}
                  identifier={"source"}
                  onCityClick={handleCityClick}
                />;
              })
            }
          </div>
        )}
      </div>

      <div className="destination-city-div city-div">
        {showPopOver.destination && (
          <div className="search-city-div">
            {filterCities('destination', suggestions.search.cities, search)
              .map((city, index) => {
                return <CitiesDiv key={index} city={city}
                  identifier={"destination"}
                  onCityClick={handleCityClick}
                />;
              })
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;