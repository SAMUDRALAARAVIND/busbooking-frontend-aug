import { useEffect, useState } from "react";
import "./styles/SearchBar.scss";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SwapOutlined } from "@ant-design/icons";
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
import { fetchCitiesList } from "./thunk";
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

const SearchBar = ({ handleNavigate }) => {
  // const navigate = useNavigate();
  const suggestions = useSelector((state) => state);
  const [today, setToday] = useState(dayjs().unix());
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
    const fetchCities = async () => {
      await dispatch(fetchCitiesList());
    };

    fetchCities();
  }, [dispatch]);

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

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onDateChange = (date) => {
    const epochTimeInSeconds = dayjs(date).unix();
    setToday(epochTimeInSeconds);
    dispatch(addDate(epochTimeInSeconds));
  };

  const handleCityClick = (identifier, city, cityId) => {
    if (identifier === "source") {
      dispatch(addSourceCity(city));
      dispatch(updateSourceCityId(cityId));
      setSearch({
        ...search,
        source: city,
      });
    } else {
      dispatch(addDestinationCity(city));
      dispatch(updateDestinationCityId(cityId));
      setSearch({
        ...search,
        destination: city,
      });
    }
  };

  const handleTodayClick = () => {
    const todayDate = dayjs();
    setToday(todayDate.unix());
    dispatch(addDate(todayDate.unix()));
  };

  const handleTomorrowClick = () => {
    const tomorrowDate = dayjs().add(1, "day");
    setToday(tomorrowDate.unix());
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
    handleNavigate({
      source: suggestions.search.sourceCity,
      sourceId: suggestions.search.sourceCityId,
      destination: suggestions.search.destinationCity,
      destinationId: suggestions.search.destinationCityId,
      selectedDate: new Date(today).getTime(),
    });
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
              viewBox="0 0 23 22"
              className={showPopOver.source ? "orange" : ""}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.552.065c-.74.18-1.384.81-1.643 1.608-.068.21-.08.488-.101 2.509l-.024 2.272-.27.097A2.378 2.378 0 0 0 .066 8.144C.019 8.324 0 8.61 0 9.138c0 .91.053 1.096.41 1.453.297.298.583.409 1.05.409h.341l.013 3.643.013 3.642.1.278c.147.407.293.634.61.948.281.278.7.529.976.584l.13.026.02.417c.031.656.265 1.056.777 1.326l.223.118 1.228.013c1.17.012 1.24.008 1.476-.08.17-.064.319-.164.476-.321.298-.299.41-.584.41-1.054v-.342h5.5v.342c0 .47.112.756.41 1.054.157.157.306.257.476.321.237.088.306.092 1.476.08l1.228-.013.223-.118c.512-.27.746-.67.778-1.326l.02-.418.129-.025c.276-.055.695-.306.975-.584.318-.314.465-.541.611-.948l.1-.278.013-3.642.013-3.643h.34c.467 0 .754-.111 1.051-.408a1.34 1.34 0 0 0 .305-.437 1.34 1.34 0 0 1 .112-.249c.048-.055.047-1.625-.002-1.596-.02.013-.049-.05-.063-.14-.045-.278-.32-.77-.58-1.035-.301-.306-.529-.458-.876-.584l-.27-.097-.024-2.272c-.026-2.5-.021-2.45-.308-2.993-.17-.319-.606-.755-.928-.927-.523-.279-.079-.264-7.98-.26-6.046.002-7.218.012-7.43.063Zm1.964 1.86a1.35 1.35 0 0 0-.548 2.198c.102.109.278.245.392.303l.206.105H16.44l.207-.105a1.73 1.73 0 0 0 .39-.303c.62-.662.42-1.736-.396-2.137l-.244-.12-5.33-.009c-5.028-.01-5.342-.005-5.551.067Zm-.73 3.618c-.397.08-.742.333-.942.694l-.126.229-.012 2.627c-.012 2.563-.01 2.634.076 2.864.118.316.446.644.759.761.23.086.308.087 6.462.087s6.232 0 6.462-.087c.314-.117.64-.445.759-.76.086-.231.088-.302.076-2.865l-.012-2.627-.126-.229c-.154-.278-.352-.457-.667-.605l-.238-.112-6.147-.006c-3.38-.004-6.226.01-6.324.029ZM.018 9.13c0 .45.006.627.014.396.008-.232.008-.6 0-.817-.008-.217-.014-.028-.014.421Zm5.505 5.623a1.418 1.418 0 0 0-.837.828c-.318.843.279 1.749 1.193 1.812a1.374 1.374 0 0 0 1.3-.75c.149-.294.168-.763.044-1.093a1.434 1.434 0 0 0-.76-.766c-.263-.099-.728-.114-.94-.03Zm10.009.03c-.304.12-.632.456-.75.767-.123.33-.104.799.045 1.094.245.484.769.786 1.3.749 1.148-.08 1.692-1.432.91-2.267-.274-.293-.524-.404-.94-.418-.265-.009-.396.009-.565.076Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              name="source-city-input"
              id="source-city-input"
              placeholder="From Station"
              value={search["source"]}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 10 12"
              className={showPopOver.destination ? "orange" : ""}
            >
              <path
                d="M5 0a4.789 4.789 0 0 0-5 4.532c0 3.552 4.53 7.218 4.723 7.373a.453.453 0 0 0 .554 0C5.47 11.751 10 8.084 10 4.532A4.789 4.789 0 0 0 5 0Zm0 7a2.514 2.514 0 1 1 2.778-2.5A2.652 2.652 0 0 1 5 7Z"
                data-name="Path 1660"
              />
            </svg>
            <input
              type="text"
              name="destination-city-input"
              id="destination-city-input"
              placeholder="To Station"
              value={search["destination"]}
              onChange={(e) => {
                setSearch({ ...search, destination: e.target.value });
              }}
            />
          </div>

          <div className="search-date search-input">
            <div className="datePicker">
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
              <DatePicker
                suffixIcon={null}
                style={{ border: "none" }}
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
      </form>

      <div className="source-city-div city-div">
        {showPopOver.source && (
          <div className="search-city-div">
            {filterCities("source", suggestions.search.cities, search).length >
            0 ? (
              filterCities("source", suggestions.search.cities, search).map(
                (cityObj, index) => {
                  return (
                    <CitiesDiv
                      key={index}
                      city={cityObj}
                      identifier={"source"}
                      onCityClick={handleCityClick}
                    />
                  );
                }
              )
            ) : (
              <div className="singleCity">No Data Found</div>
            )}
          </div>
        )}
      </div>

      <div className="destination-city-div city-div">
        {showPopOver.destination && (
          <div className="search-city-div">
            {filterCities("destination", suggestions.search.cities, search)
              .length > 0 ? (
              filterCities(
                "destination",
                suggestions.search.cities,
                search
              ).map((cityObj, index) => {
                return (
                  <CitiesDiv
                    key={index}
                    city={cityObj}
                    identifier={"destination"}
                    onCityClick={handleCityClick}
                  />
                );
              })
            ) : (
              <div className="singleCity">No Data Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
