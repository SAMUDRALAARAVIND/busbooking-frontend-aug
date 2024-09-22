import React , {useState, useEffect} from 'react'
import { svg, aminitiesSvg } from "./svg";
import { CancellationModal, TravelPolicy, DroppingBoardingPoint, Aminities } from './modals'
import { DownOutlined } from "@ant-design/icons";

export const TripDetails = ({ trip , activeTripId, handleModalToggle}) => {
  const [toggleAminities, setToggleAminities] = useState(false);
  const [boardingDroppingPoints, setBoardingDroppingPoints] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState(false);
  const [travelPolicy, setTravelPolicy] = useState(false);

  const isActive = activeTripId === trip.tripId;
  const [openModal, setOpenModal] = useState(null);
  useEffect(() => {
    // Close modals if the active trip changes
    if (!isActive) {
      setOpenModal(null);
    }
  }, [isActive]);

  const handleModalOpen = (modalType) => {
    setOpenModal((prevModal) => (prevModal === modalType ? null : modalType));
  };

  useEffect(() => {
    const closeModals = () => {
      setToggleAminities(false);
      setBoardingDroppingPoints(false);
      setCancellationPolicy(false);
      setTravelPolicy(false)
    };
  
    window.addEventListener("click", closeModals);
    return () => {
      window.removeEventListener("click", closeModals);  
    };
  }, []);
  

  return (
    <>
      <TripRecord
        {...{ setToggleAminities, setBoardingDroppingPoints, setCancellationPolicy, setTravelPolicy }}
        trip={trip} 
      />
      <MoreDetails
        {...{ setToggleAminities, setBoardingDroppingPoints, setCancellationPolicy , setTravelPolicy}}
        trip={trip}   handleModalToggle={handleModalToggle}
        handleModalOpen={handleModalOpen}
        isActive={isActive}
        openModal={openModal}
      />
      
      {/* Conditional rendering of modals */}
      {isActive && (
        <>
     {openModal === "boardingDroppingPoints" && <DroppingBoardingPoint />}
          {openModal === "aminities" && <Aminities trip={trip} />}
          {openModal === "cancellationPolicy" && <CancellationModal trips={trip} />}
          {openModal === "travelPolicy" && <TravelPolicy />}
       
      </>
      )}
    </>
  );
};

export const MoreDetails = ({
  handleModalOpen,
  isActive,
  trip,
  openModal,
  handleModalToggle,
}) => {
  return (
    <div className="moreDetails flex">
      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          handleModalToggle();
          handleModalOpen("boardingDroppingPoints");
        }}
      >
        <p className="grey">Boarding & Dropping Points</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}} />
        </p>
      </div>

      <div className="straightLine"></div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleModalToggle();
          handleModalOpen("aminities");
        }}
        className="flex"
      >
        <p className="grey">Amenities</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
      <div className="straightLine"></div>

      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          handleModalToggle();
          handleModalOpen("cancellationPolicy");
        }}
      >
        <p className="grey">Cancellation Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
      <div className="straightLine"></div>

      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          handleModalToggle();
          handleModalOpen("travelPolicy");
        }}
      >
        <p className="grey">Travel Policy</p>
        <p>
          <DownOutlined className="downArrow grey" style={{marginTop:"0px"}}/>
        </p>
      </div>
    </div>
  );
};

export const TripRecord = ({
    setToggleAminities,
    setBoardingDroppingPoints,
    setCancellationPolicy,
    setTravelPolicy,
    trip,
  }) => {
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
  
        <div className="aminities flex">
          {trip.amenities.slice(0, 3).map((item, index) => {
            const matchedAmenity = aminitiesSvg.find((amenity) => {
              return amenity.name === item;
            });
  
            return matchedAmenity ? (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: matchedAmenity.img }}
              />
            ) : (
              <span key={index}>{item}</span> // Fallback if no matching SVG is found
            );
          })}
  
          {trip.amenities.length > 3 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setToggleAminities((prev) => !prev);
                setBoardingDroppingPoints(false);
                setCancellationPolicy(false)
                setTravelPolicy(false)
              }}
              className="aminitiesLength "
            >
              +{trip.amenities.slice(3).length}
            </span>
          )}
        </div>
  
        <div className="tracking flex">
          <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
          <p className="" style={{color:"#444444"}}>Live Tracking</p>
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
  