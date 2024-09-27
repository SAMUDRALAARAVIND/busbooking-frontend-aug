const currentDate = new Date();
const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));
const epochTime = (hours, minutes) => {
  const date = new Date(tomorrow.setHours(hours, minutes, 0, 0));
  return Math.floor(date.getTime() / 1000);
};

export const tripsResponse = {
  sourceCity: {
    cityId: "64fd5a2cb1a2b113abf5e2b1",
    name: "Kolkata",
    state: "West Bengal",
  },
  destinationCity: {
    cityId: "64fd5b2cb1a2b113abf5e3f5",
    name: "Delhi",
    state: "Delhi",
  },
  boardingPoints: [
    { stopId: 1001, title: "Salt Lake City" },
    { stopId: 1002, title: "Howrah Station" },
    { stopId: 1003, title: "Esplanade" },
    { stopId: 1004, title: "Sealdah Station" },
  ],
  droppingPoints: [
    { stopId: 2001, title: "Kashmiri Gate" },
    { stopId: 2002, title: "ISBT Anand Vihar" },
    { stopId: 2003, title: "Karol Bagh" },
    { stopId: 2004, title: "RK Ashram" },
  ],
  trips: [
    {
      busId: "BUS12345",
      tripId: "TRIP67890",
      busPartner: "Kingdom Express",
      departureTime: epochTime(8, 0), // 8:00 AM tomorrow
      arrivalTime: epochTime(17, 0), // 5:00 PM tomorrow
      amenities: ["WIFI", "CHARGING_PORT", "AIR_CONDITIONING"],
      averageRating: 4.2,
      numberOfRatings: 3200,
      availableSeats: 15,
      busType: "AC",
      minPrice: 1200,
      maxPrice: 1500,
      boardingPoints: [
        { stopId: 1001, arrivalTime: epochTime(8, 0) }, // Salt Lake City, 8:00 AM
        { stopId: 1002, arrivalTime: epochTime(9, 0) }, // Howrah Station, 9:00 AM
      ],
      droppingPoints: [
        { stopId: 2001, arrivalTime: epochTime(17, 0) }, // Kashmiri Gate, 5:00 PM
        { stopId: 2002, arrivalTime: epochTime(18, 0) }, // ISBT Anand Vihar, 6:00 PM
      ],
    },
    {
      busId: "BUS98765",
      tripId: "TRIP54321",
      busPartner: "Royal Travels",
      departureTime: epochTime(11, 0), // 11:00 AM tomorrow
      arrivalTime: epochTime(18, 0), // 6:00 PM tomorrow
      amenities: ["WATER", "CCTV", "FIRST_AID_BOX", "CHARGING_PORT"],
      averageRating: 4.5,
      numberOfRatings: 450,
      availableSeats: 20,
      busType: "NON_AC",
      minPrice: 2000,
      maxPrice: 2200,
      boardingPoints: [
        { stopId: 1001, arrivalTime: epochTime(11, 0) }, // Salt Lake City, 11:00 AM
        { stopId: 1003, arrivalTime: epochTime(11, 30) }, // Esplanade, 11:30 AM
      ],
      droppingPoints: [
        { stopId: 2002, arrivalTime: epochTime(18, 0) }, // ISBT Anand Vihar, 6:00 PM
        { stopId: 2004, arrivalTime: epochTime(19, 30) }, // RK Ashram, 7:30 PM
      ],
    },
    {
      busId: "BUS65432",
      tripId: "TRIP09876",
      busPartner: "Skyline Bus Services",
      departureTime: epochTime(18, 30), // 6:30 PM tomorrow
      arrivalTime: epochTime(0, 30), // 12:30 AM next day
      amenities: ["TRAINED_STAFF", "FIRE_EXTINGUISHER", "WIFI"],
      averageRating: 4.0,
      numberOfRatings: 200,
      availableSeats: 25,
      busType: "SLEEPER",
      minPrice: 800,
      maxPrice: 1100,
      boardingPoints: [
        { stopId: 1002, arrivalTime: epochTime(16, 30) }, // Howrah Station, 6:30 PM
        { stopId: 1004, arrivalTime: epochTime(21, 30) }, // Sealdah Station, 7:00 PM
      ],
      droppingPoints: [
        { stopId: 2001, arrivalTime: epochTime(0, 30) }, // Kashmiri Gate, 12:30 AM next day
        { stopId: 2003, arrivalTime: epochTime(1, 0) }, // Karol Bagh, 1:00 AM next day
      ],
    },
    {
      busId: "BUS11111",
      tripId: "TRIP22222",
      busPartner: "Trans India Travels",
      departureTime: epochTime(0, 0), // 12:00 AM tomorrow
      arrivalTime: epochTime(8, 0), // 8:00 AM tomorrow
      amenities: ["CHARGING_PORT", "SNACKS", "RECLINER_SEATS"],
      averageRating: 4.3,
      numberOfRatings: 1800,
      availableSeats: 18,
      busType: "SLEEPER",
      minPrice: 1300,
      maxPrice: 1600,
      boardingPoints: [
        { stopId: 1001, arrivalTime: epochTime(0, 0) }, // Salt Lake City, 12:00 AM
        { stopId: 1003, arrivalTime: epochTime(0, 30) }, // Esplanade, 12:30 AM
      ],
      droppingPoints: [
        { stopId: 2002, arrivalTime: epochTime(8, 0) }, // ISBT Anand Vihar, 8:00 AM
        { stopId: 2004, arrivalTime: epochTime(9, 0) }, // RK Ashram, 9:00 AM
      ],
    },
    {
      busId: "BUS77777",
      tripId: "TRIP88888",
      busPartner: "City Express",
      departureTime: epochTime(7, 30), // 7:30 AM tomorrow
      arrivalTime: epochTime(16, 0), // 4:00 PM tomorrow
      amenities: ["WIFI", "SNACKS", "ONBOARD_TOILET"],
      averageRating: 4.7,
      numberOfRatings: 500,
      availableSeats: 10,
      busType: "SEATER",
      minPrice: 1800,
      maxPrice: 2000,
      boardingPoints: [
        { stopId: 1002, arrivalTime: epochTime(23, 30) }, // Howrah Station, 7:30 AM
        { stopId: 1004, arrivalTime: epochTime(22, 0) }, // Sealdah Station, 8:00 AM
      ],
      droppingPoints: [
        { stopId: 2001, arrivalTime: epochTime(16, 0) }, // Kashmiri Gate, 4:00 PM
        { stopId: 2003, arrivalTime: epochTime(16, 30) }, // Karol Bagh, 4:30 PM
      ],
    },
  ],
};



// export const tripsResponse = {
//   sourceCity: {
//     cityId: "64fd5a2cb1a2b113abf5e2b1",
//     name: "Kolkata",
//     state: "West Bengal",
//   },
//   destinationCity: {
//     cityId: "64fd5b2cb1a2b113abf5e3f5",
//     name: "Delhi",
//     state: "Delhi",
//   },
//   boardingPoints: [
//     {
//       stopId: 1,
//       title: "Salt Lake City",
//       directions: "Near City Center Mall",
//       lat: 22.5726,
//       lng: 88.3639,
//     },
//     {
//       stopId: 2,
//       title: "Howrah Station",
//       directions: "Main Entrance Gate",
//       lat: 22.585,
//       lng: 88.3463,
//     },
//     {
//       stopId: 3,
//       title: "Esplanade",
//       directions: "Opposite Metro Station",
//       lat: 22.5646,
//       lng: 88.3433,
//     },
//     {
//       stopId: 4,
//       title: "Sealdah Station",
//       directions: "Near Platform 1",
//       lat: 22.5729,
//       lng: 88.3875,
//     },
//   ],
//   droppingPoints: [
//     {
//       stopId: 5,
//       title: "Kashmiri Gate",
//       directions: "Near Metro Station",
//       lat: 28.6692,
//       lng: 77.23,
//     },
//     {
//       stopId: 6,
//       title: "ISBT Anand Vihar",
//       directions: "Main Bus Stand",
//       lat: 28.653,
//       lng: 77.274,
//     },
//     {
//       stopId: 7,
//       title: "Karol Bagh",
//       directions: "Near Hanuman Temple",
//       lat: 28.6519,
//       lng: 77.1894,
//     },
//     {
//       stopId: 8,
//       title: "RK Ashram",
//       directions: "Metro Gate No. 2",
//       lat: 28.6411,
//       lng: 77.2037,
//     },
//   ],
//   trips: [
//     {
//       busId: "BUS12345",
//       tripId: "TRIP67890",
//       busPartner: "IntrCity SmartBus (Washroom onboard)",
//       departureTime: 1700003600,
//       arrivalTime: 1700036000,
//       amenities: ["WIFI", "CHARGING_PORT", "AIR_CONDITIONING"],
//       averageRating: 4.2,
//       numberOfRatings: 3200,
//       availableSeats: 15,
//       busType: "AC Sleeper",
//       minPrice: 1200,
//       maxPrice: 1500,
//       boardingPoints: [1, 2, 3, 4], // Stop IDs for boarding points
//       droppingPoints: [5, 6, 7, 8], // Stop IDs for dropping points
//     },
//     {
//       busId: "BUS98765",
//       tripId: "TRIP54321",
//       busPartner: "AK Travels",
//       departureTime: 1700010000,
//       arrivalTime: 1700042000,
//       amenities: ["WATER", "CCTV", "fIRST_AID_BOX", "CHARGING_PORT"],
//       averageRating: 4.5,
//       numberOfRatings: 450,
//       availableSeats: 20,
//       busType: "Non-AC Seater",
//       minPrice: 1000,
//       maxPrice: 1200,
//       boardingPoints: [1, 3], // Select boarding points
//       droppingPoints: [6, 8], // Select dropping points
//     },
//     {
//       busId: "BUS65432",
//       tripId: "TRIP09876",
//       busPartner: "CM Services",
//       departureTime: 1700022000,
//       arrivalTime: 1700055000,
//       amenities: ["TRAINED_STAFF", "FIRE_EXTINGUISHER", "WIFI"],
//       averageRating: 4.0,
//       numberOfRatings: 200,
//       availableSeats: 25,
//       busType: "Luxury Sleeper",
//       minPrice: 1500,
//       maxPrice: 1800,
//       boardingPoints: [2, 4], // Select boarding points
//       droppingPoints: [5, 7], // Select dropping points
//     },
//   ],
// };
