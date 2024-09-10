import "./styles/SearchBar.scss";

const CitiesDiv = ({ city, onCityClick, identifier }) => {
    return (
      //TODO - add "cityId" as a custom attribute after fetching data from server
      <div className="singleCity"
        onClick={() => onCityClick(identifier, city)}
      >
        <p className="city-name">{city}</p>
        <p className="state-name">State</p>
      </div>
    );
  };
  
  export default CitiesDiv;