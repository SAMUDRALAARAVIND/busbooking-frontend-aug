import "./styles/SearchBarMobile.scss";
import { SwapOutlined } from "@ant-design/icons";
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
  updateSourceCityId,
  updateDestinationCityId,
} from "./slice";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);

function filterCities(type, cities, search) {
  const searchVal = search[type]?.toLowerCase();
  return cities
    .filter((cityObj) => {
      return cityObj.name?.toLowerCase().includes(searchVal);
    })
    .filter((cityObj) => {
      if (type === "source") {
        return (
          cityObj.name?.toLowerCase() !== search["destination"]?.toLowerCase()
        );
      } else {
        return cityObj.name?.toLowerCase() !== search["source"]?.toLowerCase();
      }
    });
}

const SearchBarMobile = ({ handleNavigate }) => {
  const suggestions = useSelector((state) => state);
  const dispatch = useDispatch();
  const [today, setToday] = useState(dayjs());
  const [showPopOver, setShowPopOver] = useState({
    source: false,
    destination: false,
    date: false,
  });
  const [search, setSearch] = useState({
    source: "",
    destination: "",
  });
  // const navigate = useNavigate();
  const todayDate = dayjs();
  const maxDate = todayDate.add(3, "month");

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

  const onCityClick = (identifier, city, cityId) => {
    if (identifier === "source") {
      dispatch(addSourceCity(city));
      dispatch(updateSourceCityId(cityId));
      setSearch({
        ...search,
        source: city,
      });
      setShowPopOver({ ...showPopOver, source: false });
    } else {
      dispatch(addDestinationCity(city));
      dispatch(updateDestinationCityId(cityId));
      setSearch({
        ...search,
        destination: city,
      });
      setShowPopOver({ ...showPopOver, destination: false });
    }
  };

  const onDateChange = (date) => {
    setToday(date);
    dispatch(addDate(date.unix()));
    setShowPopOver({ ...showPopOver, date: false });
  };
  function epochToDate(epochTime) {
    const date = new Date(epochTime * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleNavigate({
      source: suggestions.search.sourceCity,
      sourceId: suggestions.search.sourceCityId,
      destination: suggestions.search.destinationCity,
      destinationId: suggestions.search.destinationCityId,
      selectedDate: new Date(today).getTime(),
    });

    // if (search.source && search.destination && today) {
    //   const source = suggestions.search.sourceCity;
    //   const sourceId = suggestions.search.sourceCityId;
    //   const destination = suggestions.search.destinationCity;
    //   const destinationId = suggestions.search.destinationCityId;

    //   navigate(
    //     `/trips/search/${source}/${sourceId}/${destination}/${destinationId}/${today}`
    //   );
    // } else {
    //   alert("Please fill in all search fields.");
    // }
  };

  return (
    <div className="search-mobile-container">
      <div className="oranger-div"></div>
      <form action="" onSubmit={handleSearchSubmit}>
        <p className="heading">Book Bus Tickets</p>
        <div className="search-form-mobile">
          <div
            className="select-city"
            onClick={() => setShowPopOver({ ...showPopOver, source: true })}
          >
            <svg
              width="24px"
              height="24px"
              fill="currentColor"
              className="nearMe_svg__svg-icon"
              viewBox="0 0 24 24"
              style={{ color: "#838383" }}
            >
              <path d="M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
            </svg>

            <p>{suggestions.search.sourceCity || "Leaving From"}</p>
          </div>
          <hr />
          <SwapOutlined className="swap-icon" onClick={handleCitySwap} />
          <div
            className="select-city"
            onClick={() =>
              setShowPopOver({ ...showPopOver, destination: true })
            }
          >
            <svg
              width="24px"
              height="24px"
              fill="currentColor"
              className="location2_svg__svg-icon"
              viewBox="0 0 24 24"
              style={{ color: "#838383" }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>

            <p>{suggestions.search.destinationCity || "Going To"}</p>
          </div>

          <div
            className="select-date"
            onClick={() => setShowPopOver({ ...showPopOver, date: true })}
          >
            <div className="calendar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                fill="none"
                viewBox="0 0 20 22"
                style={{ marginRight: "0.5rem" }}
              >
                <path
                  fill="gray"
                  d="M5.64.327c-.318.168-.421.403-.421.975v.454l-.29.033a8.27 8.27 0 0 0-1.679.44c-.76.324-1.547.948-1.992 1.576-.403.567-.722 1.34-.9 2.18-.08.37-.085.782-.085 5.765s.005 5.395.085 5.766c.258 1.218.712 2.09 1.467 2.812.637.61 1.331.98 2.302 1.224.886.225 1.326.239 6.295.215 4.055-.014 4.617-.028 4.969-.098 1.218-.244 2.08-.661 2.807-1.36.736-.712 1.191-1.589 1.444-2.793.08-.37.085-.783.085-5.766s-.005-5.395-.085-5.766c-.258-1.228-.708-2.086-1.472-2.817-.773-.736-1.767-1.19-2.995-1.36l-.394-.055v-.455c0-.567-.103-.802-.422-.97-.253-.136-.44-.136-.703-.005-.342.178-.394.29-.412.886l-.019.51h-6.45l-.019-.506c-.014-.44-.028-.52-.126-.66-.127-.179-.422-.329-.643-.333a.908.908 0 0 0-.346.108Zm7.594 3.426c0 .422.014.502.108.638.183.271.333.351.656.351.549 0 .779-.304.783-1.022v-.412l.225.033c.469.065.942.215 1.364.421.74.366 1.266.975 1.561 1.81.146.412.272 1.097.272 1.476v.249H1.797V7.02c0-.632.248-1.56.567-2.095.09-.15.31-.427.492-.61.492-.5 1.256-.848 2.142-.974l.22-.033v.412c.005.717.235 1.022.784 1.022.323 0 .473-.08.66-.351.09-.136.104-.216.104-.638v-.487h6.468v.487Zm5.002 9.014c-.019 4.299-.024 4.364-.305 5.161-.187.52-.398.863-.787 1.256-.549.553-1.331.882-2.381.999-.61.07-8.916.07-9.525 0-.647-.07-1.107-.197-1.608-.445-.74-.366-1.266-.976-1.561-1.81-.281-.801-.281-.773-.305-5.114l-.023-3.97H18.26l-.024 3.923Z"
                />
                <path
                  fill="#EB5353"
                  d="M6.19 11.53c-.432.14-.69.502-.69.97 0 1.149 1.542 1.412 1.969.338.093-.244.037-.689-.127-.919-.244-.347-.754-.52-1.153-.389ZM9.634 11.543c-.604.22-.839.966-.482 1.528.272.431.918.572 1.373.305.647-.38.656-1.369.014-1.744a1.116 1.116 0 0 0-.905-.089ZM13.178 11.534c-.431.16-.642.427-.68.867-.065.722.54 1.252 1.243 1.083.469-.108.76-.492.76-.984 0-.399-.198-.746-.526-.919-.187-.098-.595-.122-.797-.047ZM6.152 15.05c-.46.165-.67.502-.643 1.023.02.384.183.651.507.82.178.098.262.113.543.098.432-.018.657-.159.835-.51.422-.854-.357-1.749-1.242-1.43ZM9.648 15.04c-.651.23-.881 1.065-.436 1.604.202.248.446.356.788.356.797 0 1.256-.778.89-1.5-.21-.412-.778-.623-1.242-.46ZM13.07 15.074c-.534.249-.736.858-.464 1.406.178.352.403.493.834.511.282.015.366 0 .544-.098a1.17 1.17 0 0 0 .352-.31c.126-.182.14-.234.14-.585 0-.342-.014-.408-.126-.577-.253-.384-.853-.544-1.28-.347Z"
                />
              </svg>
            </div>
            <p className="date-p">
              {suggestions.search.date
                ? epochToDate(suggestions.search.date)
                : today.format("DD/MM/YYYY")}
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
          value={search["source"]}
          onChange={(e) => {
            setSearch({ ...search, source: e.target.value });
          }}
        />
        <div className="search-city-div">
          {filterCities("source", suggestions.search.cities, search).length >
          0 ? (
            showPopOver.source &&
            filterCities("source", suggestions.search.cities, search).map(
              (city, index) => {
                return (
                  <CitiesDiv
                    key={index}
                    city={city}
                    identifier={"source"}
                    onCityClick={onCityClick}
                  />
                );
              }
            )
          ) : (
            <div className="singleCity">No Data Found</div>
          )}
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
          value={search["destination"]}
          onChange={(e) => {
            setSearch({ ...search, destination: e.target.value });
          }}
        />
        <div className="search-city-div">
          {filterCities("destination", suggestions.search.cities, search)
            .length > 0 ? (
            showPopOver.destination &&
            filterCities("destination", suggestions.search.cities, search).map(
              (city, index) => {
                return (
                  <CitiesDiv
                    key={index}
                    city={city}
                    identifier={"destination"}
                    onCityClick={onCityClick}
                  />
                );
              }
            )
          ) : (
            <div className="singleCity">No Data Found</div>
          )}
        </div>
      </Drawer>

      <Drawer
        title="Select Departure Date"
        placement="left"
        closable={true}
        onClose={() => setShowPopOver({ ...showPopOver, date: false })}
        open={showPopOver.date}
        width="100%"
        style={{ textAlign: "left" }}
      >
        <DatePicker
          defaultValue={
            suggestions.search.date
              ? dayjs.unix(suggestions.search.date)
              : today
          }
          value={
            suggestions.search.date
              ? dayjs.unix(suggestions.search.date)
              : today
          }
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
