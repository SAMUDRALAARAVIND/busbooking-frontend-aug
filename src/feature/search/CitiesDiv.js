import "./styles/SearchBar.scss";

const CitiesDiv = ({ city, onCityClick, identifier }) => {
  return (
    <div className="singleCity" onClick={() => onCityClick(identifier, city.name,city.cityId)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        fill="none"
        viewBox="0 0 22 22"
        style={{ color: "black"}}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M.644 21.905a.55.55 0 0 1 0-1.1h.353v-4.39a.55.55 0 0 1 .55-.55h2.028V6.315a.55.55 0 0 1 .55-.55h2.887V3.223a.55.55 0 0 1 .55-.55h.31V.645a.55.55 0 0 1 .55-.55h5.156a.55.55 0 0 1 .55.55v2.028h.31a.55.55 0 0 1 .55.55v5.761l3.133 1.567a.55.55 0 0 1 .304.492v1.809l2.274 1.136a.55.55 0 0 1 .304.492v6.325h.352a.55.55 0 1 1 0 1.1H.644ZM13.028 2.674H8.972V1.195h4.056v1.478Zm.55 1.1h.31v4.661l-.923-.461a.55.55 0 0 0-.796.492v12.34H9.83V6.316a.55.55 0 0 0-.55-.55H8.112V3.773H13.578Zm3.747 17.032h-4.056V9.356l.913.456.012.006.008.004 3.123 1.562v9.422Zm2.578 0h-1.478v-6.724l1.478.74v5.984Zm-13.75 0H4.675v-1.598a.55.55 0 0 0-1.1 0v1.598H2.097v-3.84h4.056v3.84Zm-1.478-4.94h2.028a.55.55 0 0 1 .55.55v4.39h1.478V6.866H4.675v8.998Zm10.622-.835a.55.55 0 0 0 .55-.55v-1.289a.55.55 0 0 0-1.1 0v1.29c0 .303.246.55.55.55Zm-8.044-4.846a.55.55 0 1 1-1.1 0v-1.29a.55.55 0 0 1 1.1 0v1.29Zm-.55 4.417a.55.55 0 0 0 .55-.55v-1.29a.55.55 0 0 0-1.1 0v1.29c0 .303.246.55.55.55Zm9.144 3.747a.55.55 0 0 1-1.1 0v-1.29a.55.55 0 0 1 1.1 0v1.29Z"
          clipRule="evenodd"
        />
      </svg>
      <div id={city.cityId}>
            <p className="city-name">{city.name}</p>
            <p className="state-name">{city.state}</p>
      </div>
    </div>
  );
};

export default CitiesDiv;