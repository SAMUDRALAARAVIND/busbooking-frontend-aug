import React, { useState, useEffect } from "react";
import { boardingPoints, droppingPoints } from "../data";
import { svg, aminitiesSvg } from "./svg";
import {
  CancellationModal,
  TravelPolicy,
  DroppingBoardingPoint,
  Aminities,
} from "./modals";
import { DownOutlined } from "@ant-design/icons";
import ToolTip from "../../../components/ToolTip";

export const TripDetails = ({ trip }) => {
  // Use a single state to track which modal is open
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const closeModals = () => {
      setActiveModal(null);
    };
    window.addEventListener("click", closeModals);
    return () => {
      window.removeEventListener("click", closeModals);
    };
  }, []);

  return (
    <>
      <TripRecord {...{ setActiveModal }} trip={trip} />
      <MoreDetails {...{ setActiveModal }} trip={trip} />
      
      {/* Conditional rendering of modals */}
      {activeModal === 'boardingDroppingPoints' && <DroppingBoardingPoint trip={trip}/>}
      {activeModal === 'aminities' && <Aminities trip={trip} />}
      {activeModal === 'cancellationPolicy' && <CancellationModal trips={trip} />}
      {activeModal === 'travelPolicy' && <TravelPolicy />}
    </>
  );
};

export const MoreDetails = ({ setActiveModal, trip }) => {
  const handleToggle = (e, modalName) => {
    e.stopPropagation();
    setActiveModal((prevModal) => (prevModal === modalName ? null : modalName));
  };

  return (
    <div className="moreDetails flex">
      <div className="flex" onClick={(e) => handleToggle(e, 'boardingDroppingPoints')}>
        <p className="grey">Boarding & Dropping Points</p>
        <p>
          <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
        </p>
      </div>

      <div className="straightLine"></div>

      <div className="flex" onClick={(e) => handleToggle(e, 'aminities')}>
        <p className="grey">Amenities</p>
        <p>
          <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
        </p>
      </div>

      <div className="straightLine"></div>

      <div className="flex" onClick={(e) => handleToggle(e, 'cancellationPolicy')}>
        <p className="grey">Cancellation Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
        </p>
      </div>

      <div className="straightLine"></div>

      <div className="flex" onClick={(e) => handleToggle(e, 'travelPolicy')}>
        <p className="grey">Travel Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
        </p>
      </div>
    </div>
  );
};

// export const MoreDetails = ({ trip, isActive }) => {
//   return (
//     <div className="moreDetails flex">
//       {/* Boarding & Dropping Points */}
//       <ToolTip title="Boarding & Dropping Points" id="boardingDroppingPoints">
//         <div className="flex">
//           <p className="grey">Boarding & Dropping Points</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       {/* Amenities */}
//       <ToolTip title="Amenities" id="amenities">
//         <div className="flex">
//           <p className="grey">Amenities</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       {/* Cancellation Policy */}
//       <ToolTip title="Cancellation Policy" id="cancellationPolicy">
//         <div className="flex">
//           <p className="grey">Cancellation Policy</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       {/* Travel Policy */}
//       <ToolTip title="Travel Policy" id="travelPolicy">
//         <div className="flex">
//           <p className="grey">Travel Policy</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>
//     </div>
//   );
// };


// export const MoreDetails = ({ handleModalOpen, trip, openModal }) => {
//   return (
//     <div className="moreDetails flex">
//       <ToolTip title="Boarding & Dropping Points" id="boardingDroppingPoints">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen("boardingDroppingPoints");
//           }}
//         >
//           <p className="grey">Boarding & Dropping Points</p>
//           <DownOutlined
//             className="downArrow grey"
//             style={{ marginTop: "0px" }}
//           />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       <ToolTip title="Amenities" id="aminities">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen("aminities");
//           }}
//         >
//           <p className="grey">Amenities</p>
//           <DownOutlined
//             className="downArrow grey"
//             style={{ marginTop: "0px" }}
//           />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       <ToolTip title="Cancellation Policy" id="cancellationPolicy">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen("cancellationPolicy");
//           }}
//         >
//           <p className="grey">Cancellation Policy</p>
//           <DownOutlined
//             className="downArrow grey"
//             style={{ marginTop: "0px" }}
//           />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       <ToolTip title="Travel Policy" id="travelPolicy">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen("travelPolicy");
//           }}
//         >
//           <p className="grey">Travel Policy</p>
//           <DownOutlined
//             className="downArrow grey"
//             style={{ marginTop: "0px" }}
//           />
//         </div>
//       </ToolTip>
//     </div>
//   );
// };

//       <div className="straightLine"></div>

//       <ToolTip title="Cancellation Policy" id="cancellationPolicy">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen('cancellationPolicy');
//           }}
//         >
//           <p className="grey">Cancellation Policy</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>

//       <div className="straightLine"></div>

//       <ToolTip title="Travel Policy" id="travelPolicy">
//         <div
//           className="flex"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleModalOpen('travelPolicy');
//           }}
//         >
//           <p className="grey">Travel Policy</p>
//           <DownOutlined className="downArrow grey" style={{ marginTop: "0px" }} />
//         </div>
//       </ToolTip>
//     </div>
//   );
// };

export const TripRecord = ({ setActiveModal, trip }) => {
  return (
    <div className="tripRecords flex">
      {/* <div className="rating flex">
        <div className="avgRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.ratingSvg }} />
          <p>{trip.averageRating}</p>
        </div>
        <div className="totalRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.usersRating }} />
          <p className="grey">{formatRatings(trip.numberOfRatings)}</p>
        </div>
      </div> */}

      <div className="aminities flex"   onClick={(e) => {
              e.stopPropagation();
              setActiveModal((prevModal) => (prevModal === 'aminities' ? null : 'aminities'));
            }}>
        {trip.amenities.slice(0, 3).map((item, index) => {
          const matchedAmenity = aminitiesSvg.find((amenity) => amenity.name === item);
          return matchedAmenity ? (
            <span key={index} dangerouslySetInnerHTML={{ __html: matchedAmenity.img }} />
          ) : (
            <span key={index}>{item}</span>
          );
        })}

        {trip.amenities.length > 3 && (
          <span
          
            className="aminitiesLength"
          >
            +{trip.amenities.slice(3).length}
          </span>
        )}
      </div>

      <div className="tracking flex">
        <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
        <p className="" style={{ color: "#444444" }}>Live Tracking</p>
      </div>
    </div>
  );
};


const formatRatings = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number;
};
