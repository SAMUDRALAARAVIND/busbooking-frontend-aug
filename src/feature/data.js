


export const tripsData = [
  {
    "sourceCity": {
      "cityId": "64fd5a2cb1a2b113abf5e2b1",
      "name": "Kolkata",
      "state": "West Bengal"
    },
    "destinationCity": {
      "cityId": "64fd5b2cb1a2b113abf5e3f5",
      "name": "Delhi",
      "state": "Delhi"
    },
    "boardingPoints": [
      {
        "stopId": 1,
        "title": "Salt Lake City",
        "directions": "Near City Center Mall",
        "lat": 22.5726,
        "lng": 88.3639
      },
      {
        "stopId": 2,
        "title": "Howrah Station",
        "directions": "Main Entrance Gate",
        "lat": 22.5850,
        "lng": 88.3463
      },
      {
        "stopId": 3,
        "title": "Esplanade",
        "directions": "Opposite Metro Station",
        "lat": 22.5646,
        "lng": 88.3433
      },
      {
        "stopId": 4,
        "title": "Sealdah Station",
        "directions": "Near Platform 1",
        "lat": 22.5729,
        "lng": 88.3875
      }
    ],
    "droppingPoints": [
      {
        "stopId": 5,
        "title": "Kashmiri Gate",
        "directions": "Near Metro Station",
        "lat": 28.6692,
        "lng": 77.2300
      },
      {
        "stopId": 6,
        "title": "ISBT Anand Vihar",
        "directions": "Main Bus Stand",
        "lat": 28.6530,
        "lng": 77.2740
      },
      {
        "stopId": 7,
        "title": "Karol Bagh",
        "directions": "Near Hanuman Temple",
        "lat": 28.6519,
        "lng": 77.1894
      },
      {
        "stopId": 8,
        "title": "RK Ashram",
        "directions": "Metro Gate No. 2",
        "lat": 28.6411,
        "lng": 77.2037
      }
    ],
    "trips": [
      {
        "busId": "BUS12345",
        "tripId": "TRIP67890",
        "busPartner": "IntrCity SmartBus (Washroom onboard)",
        "departureTime": 1700003600, // Epoch time for departure
        "arrivalTime": 1700036000,   // Epoch time for arrival
        "amenities": ["WIFI", "CHARGING_PORT", "AIR_CONDITIONING"],
        "averageRating": 4.2,
        "numberOfRatings": 3200,
        "availableSeats": 15,
        "busType": "AC Sleeper",
        "minPrice": 1200,
        "maxPrice": 1500,
        "boardingPoints": [1, 2, 3, 4], // Stop IDs for boarding points
        "droppingPoints": [5, 6, 7, 8]  // Stop IDs for dropping points
      },
      {
        "busId": "BUS98765",
        "tripId": "TRIP54321",
        "busPartner": "AK Travels",
        "departureTime": 1700010000,
        "arrivalTime": 1700042000,
        "amenities": ["WATER", "CCTV", "fIRST_AID_BOX",  "CHARGING_PORT"],
        "averageRating": 4.5,
        "numberOfRatings": 450,
        "availableSeats": 20,
        "busType": "Non-AC Seater",
        "minPrice": 1000,
        "maxPrice": 1200,
        "boardingPoints": [1, 3],  // Select boarding points
        "droppingPoints": [6, 8]   // Select dropping points
      },
      {
        "busId": "BUS65432",
        "tripId": "TRIP09876",
        "busPartner": "CM Services",
        "departureTime": 1700022000,
        "arrivalTime": 1700055000,
        "amenities": ["TRAINED_STAFF", "FIRE_EXTINGUISHER", "WIFI"],
        "averageRating": 4.0,
        "numberOfRatings": 200,
        "availableSeats": 25,
        "busType": "Luxury Sleeper",
        "minPrice": 1500,
        "maxPrice": 1800,
        "boardingPoints": [2, 4],  // Select boarding points
        "droppingPoints": [5, 7]   // Select dropping points
      }
    ]
  }
  
  
]

export const boardingPoints = [
    {
      name: "lonavala Bus Station",
      address: "Kempegowda Bus Station, Bengaluru, Karnataka 560009"
    },
    {
      name: "Madiwala",
      address: "5th Block, Madiwala Main Road, Koramangala, Bengaluru, Karnataka 560095"
    },
    {
      name: "Marathahalli",
      address: "Opposite Kala Mandir, Marathahalli Bridge, Bengaluru, Karnataka 560037"
    },
    {
      name: "Electronic City",
      address: "1st Phase, Wipro Gate, Electronic City, Bengaluru, Karnataka 560100"
    },
    {
      name: "Yeshwanthpur",
      address: "Near Yeshwanthpur Railway Station, Tumkur Road, Bengaluru, Karnataka 560022"
    }
  ];
  


  export const droppingPoints = [
    {
      name: "Koyambedu Bus Terminal",
      date: "12th September 2024",
      time: "06:30 AM"
    },
    {
      name: "Guindy",
      date: "12th September 2024",
      time: "07:00 AM"
    },
    {
      name: "Tambaram",
      date: "12th September 2024",
      time: "07:30 AM"
    },
    {
      name: "Perungalathur",
      date: "12th September 2024",
      time: "07:45 AM"
    },
    {
      name: "Chengalpattu",
      date: "12th September 2024",
      time: "08:30 AM"
    }
  ];
  