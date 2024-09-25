import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import AirIcon from "@mui/icons-material/Air";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { departureTime } from "./slice";

export const busTypes = [
  {
    title: "AC",
    identifier: "AC",
    icon: <AcUnitIcon />,
  },
  {
    title: "NonAC",
    identifier: "NON_AC",
    icon: <AirIcon />,
  },
  {
    title: "Seater",
    identifier: "SEATER",
    icon: <EventSeatIcon />,
  },
  {
    title: "Sleeper",
    identifier: "SLEEPER",
    icon: <AirlineSeatFlatIcon />,
  },
];

export const busPartners = [
  "City Express",
  "Kingdom Express",
  "Trans India Travels",
  "Royal Travels",
  "Skyline Bus Services",
  // "National Travels",
  // "Orange Tours",
  // "KPN Travels",
  // "Sharma Transport",
  // "Jabbar Travels",
];

export const cities = [
  "Mumbai Central",
  "Indiranagar",
  "Bandra West",
  "Koramangala",
  "Nehru Place",
  "Anand Vihar",
  "Whitefield",
  "Rajiv Chowk",
  "Hauz Khas",
  "San Jose",
];

export const boardingPoints = [
  "Mumbai Central",
  "Andheri East",
  "Bandra West",
  "Dadar",
  "Thane",
  "Navi Mumbai",
  "Malad",
];
export const droppingPoints = [
  "Kashmere Gate",
  "Rajiv Chowk",
  "Saket",
  "Hauz Khas",
  "Dwarka Sector 21",
  "Lajpat Nagar",
  "Nehru Place",
  "Anand Vihar",
];

export const departureTimes = [
  {
    title: "Before 10AM",
    identifier: departureTime.MORNING,
    icon: <WbSunnyIcon />,
  },
  {
    title: "10AM - 5PM",
    identifier: departureTime.AFTERNOON,
    icon: <Brightness6Icon />,
  },
  {
    title: "5PM - 11PM",
    identifier: departureTime.EVENING,
    icon: <WbSunnyIcon />,
  },
  {
    title: "After 11PM",
    identifier: departureTime.NIGHT,
    icon: <NightsStayIcon />,
  },
];
