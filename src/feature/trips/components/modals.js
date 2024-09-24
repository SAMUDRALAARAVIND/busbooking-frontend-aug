import React from "react";
// import { boardingPoints, droppingPoints } from "../data";
import { formatDate, formatTime } from "./formatDatetime";
import { stopPointsSelector } from "../redux/selectors";
import { useSelector } from "react-redux";
import { aminitiesSvg } from "./svg";
import "../styles/modals.scss";

export function DroppingBoardingPoint() {
  const { boardingPoints, droppingPoints } = useSelector(stopPointsSelector);
  console.log("boardingPoints", boardingPoints);
  return (
    <div className="bdContainer flex">
      <div className="left">
        <h5>Boarding Points</h5>
        <div className="boardingList overflow">
          {boardingPoints.map((data) => {
            return (
              <div>
                <h6>{data.name}</h6>
                <p className="grey">{data.address}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="  right">
        <h5 className="">Dropping Points</h5>

        <div className=" DroppingList overflow ">
          {droppingPoints.map((data) => {
            return (
              <div>
                <h6>{data.name}</h6>
                <p className="grey">
                  <span>{data.date} </span>
                  <span> {data.time}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
}

export function CancellationModal({ trips }) {
  const departureDate = new Date(trips.departureTime * 1000);

  // Define refund rules
  const refundPolicy = [
    { daysBefore: 4, refund: 85 },
    { daysBefore: 2, refund: 70 },
    { daysBefore: 1, refund: 50 },
    { daysBefore: 0, refund: 5 },
    { daysBefore: 0, refund: 0 },
  ];

  // Calculate refund for each policy point
  const refundTimes = refundPolicy.map((policy, index) => {
    const refundDate = new Date(departureDate);
    refundDate.setDate(departureDate.getDate() - policy.daysBefore);

    // Subtract 3 hours from the calculated date
    refundDate.setHours(refundDate.getHours() - 3);

    return {
      time: `${formatDate(refundDate.getTime() / 1000)} ${formatTime(
        refundDate.getTime() / 1000
      )}`,
      refund: policy.refund,
    };
  });

  return (
    <div className="cancellation-policy overflow">
      <h5>Cancellation Policy</h5>

      <div className="heading flex">
        <div>
          <h5>Cancellation Time</h5>
        </div>
        <div>
          <h5>Refund Amount with Percentage</h5>
        </div>
      </div>

      <div>
        {refundTimes.map((policy, index) => {
          let statement = "";
          if (index === 0) {
            statement = `Before ${policy.time}`;
          } else if (index === refundTimes.length - 1) {
            statement = `After ${policy.time}`;
          } else {
            statement = `Between ${refundTimes[index - 1].time} & ${
              policy.time
            }`;
          }

          return (
            <div key={index} className="refundOnTime flex">
              <div>{statement}</div>
              <div>{`${policy.refund}% refund`}</div>
            </div>
          );
        })}
      </div>

      <div className="desc">
        <p>Refund Amount is Indicative</p>
        <p>Additional Rs. 15 per seat cancellation fee is applicable</p>
        <p>Partial Cancellation is allowed</p>
      </div>
    </div>
  );
}

export const TravelPolicy = () => {
  return (
    <>
      <div className="Travel-policy overflow">
        <h4>Travel Policy</h4>
        <h5>Do I need to buy a ticket for my child?</h5>
        <p>Please purchase a ticket for children above the age of 6</p>

        <h5>Will i charged for excess luggage ?</h5>
        <p>
          Yes excess luggage is chargeable. You are allowed to carry 2 pieces of
          luggage. 15 kgs each.
        </p>

        <h5>Can i travel with my pet ?</h5>
        <p>No, Travelling with pet is not permitted</p>
        <h5>Is ther any alcohol/liquor policy</h5>
        <p>
          Yes ALcohol/Liquor consumption and caarring it inside the bus is
          prohibited. Bus partnersreserves the right to debopard any passendger
          with inappropriate behaviour or does not comply with the policy .
          Rfunds will not be processed in such cases.
        </p>
        <h5>Will the bus wait if the boarding time has passed?</h5>
        <p>
          Bus partner do not wait for the passengers beyond the departure time.
        </p>
      </div>
    </>
  );
};

export const Aminities = ({ trip }) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", zIndex: "10" }}
        className="aminitesModal"
      >
        <h5>Aminities</h5>
        <div>
          {trip.amenities.map((item, index) => {
            const matchedAmenity = aminitiesSvg.find((amenity) => {
              return amenity.name === item;
            });
            console.log("match", matchedAmenity);

            return matchedAmenity ? (
              <p className="">
                <span
                  dangerouslySetInnerHTML={{
                    __html: matchedAmenity.img.replace(
                      /stroke="[^"]*"/g,
                      'stroke="#444444"'
                    ),
                  }}
                />
                <span
                  dangerouslySetInnerHTML={{ __html: matchedAmenity.name }}
                />
              </p>
            ) : (
              <span key={index}>{item}</span>
            );
          })}
        </div>
      </div>
    </>
  );
};
