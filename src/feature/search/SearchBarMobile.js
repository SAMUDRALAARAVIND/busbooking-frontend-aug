import "./styles/SearchBarMobile.scss";
import {
  SwapOutlined,
  EnvironmentOutlined,
  CarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { DatePicker, Drawer } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import CitiesDiv from "./CitiesDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  addSourceCity,
  addDestinationCity,
  addDate,
} from "./slice";

dayjs.extend(customParseFormat);

function filterCities(type, cities, search) {
  const searchVal = search[type]?.toLowerCase()
  return cities.filter(city => {
    return city?.toLowerCase().includes(searchVal)
  }).filter((city) => {
    if (type === "source") {
      return city.toLowerCase() !== search['destination']?.toLowerCase()
    } else {
      return city.toLowerCase() !== search["source"]?.toLowerCase();
    }
  })
}

const SearchBarMobile = () => {
  const suggestions = useSelector((state) => state);
  const dispatch = useDispatch();
  const [today, setToday] = useState(dayjs());
  const [showPopOver, setShowPopOver] = useState({
    source: false,
    destination: false,
    date: false
  })
  const [search, setSearch] = useState({
    source: "",
    destination: "",
  });
  const todayDate = dayjs();
  const maxDate = todayDate.add(3, "month");

  const onCityClick = (identifier, city) => {
    if (identifier === 'source') {
      dispatch(addSourceCity(city));
      setSearch({
        ...search,
        source: city
      })
      setShowPopOver({ ...showPopOver, source: false })
    } else {
      dispatch(addDestinationCity(city));
      setSearch({
        ...search,
        destination: city
      })
      setShowPopOver({ ...showPopOver, destination: false })
    }
  };

  const onDateChange = (date) => {
    setToday(date);
    dispatch(addDate(date.unix()));
    setShowPopOver({ ...showPopOver, date: false })
  };
  function epochToDate(epochTime) {
    const date = new Date(epochTime * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="search-mobile-container">
      <div className="oranger-div"></div>
      <form action="">
        <div className="search-form-mobile">
          <div className="select-city" onClick={() => setShowPopOver({ ...showPopOver, source: true })}>
            <CarOutlined
              style={{
                fontSize: "24px",
                marginRight: "8px",
                color: "#616161",
              }}
            />
            <p>{suggestions.search.sourceCity || "Leaving From"}</p>
          </div>
          <hr />
          <SwapOutlined className="swap-icon" />
          <div className="select-city" onClick={() => setShowPopOver({ ...showPopOver, destination: true })}>
            <EnvironmentOutlined
              style={{
                fontSize: "24px",
                color: "#616161",
                marginRight: "8px",
              }}
            />
            <p>{suggestions.search.destinationCity || "Going To"}</p>
          </div>

          <div className="select-date" onClick={() => setShowPopOver({ ...showPopOver, date: true })}>
            <div className="calendar">
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
            </div>
            <p className="date-p">
              {suggestions.search.date ? epochToDate(suggestions.search.date) :
                today.format("DD/MM/YYYY")}
            </p>
          </div>
          <button className="search-button">Submit</button>
        </div>
      </form>

      <Drawer
        title="Select Source City"
        placement="left"
        closable={true}
        onClose={() => setShowPopOver({ ...showPopOver, source: false })}
        open={showPopOver.source}
        width="100%"
      >
        <input
          className="mobile-search-input"
          type="text"
          placeholder="Leaving From"
          value={search['source']}
          onChange={(e) => {
            setSearch({ ...search, source: e.target.value })
          }}
        />
        <div className="search-city-div">
          {filterCities('source', suggestions.search.cities, search)
            .map((city, index) => {
              return <CitiesDiv key={index} city={city}
                identifier={"source"}
                onCityClick={onCityClick}
              />
            })
          }
        </div>
      </Drawer>




      <Drawer
        title="Select Destination City"
        placement="left"
        closable={true}
        onClose={() => setShowPopOver({ ...showPopOver, destination: false })}
        open={showPopOver.destination}
        width="100%"
      >
        <input
          className="mobile-search-input"
          type="text"
          placeholder="Going To"
          value={search['destination']}
          onChange={(e) => {
            setSearch({ ...search, destination: e.target.value })
          }}
        />
        <div className="search-city-div">
          {showPopOver.destination && (
            filterCities('destination', suggestions.search.cities, search)
              .map((city, index) => {
                return <CitiesDiv key={index} city={city}
                  identifier={"destination"}
                  onCityClick={onCityClick}
                />
              })
          )
          }
        </div>
      </Drawer>

      <Drawer
        title="Select Departure Date"
        placement="left"
        closable={true}
        onClose={() => setShowPopOver({ ...showPopOver, date: false })}
        open={showPopOver.date}
        width="100%"
      >
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
      </Drawer>
    </div>
  );
};

export default SearchBarMobile;