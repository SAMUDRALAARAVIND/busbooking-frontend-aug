import react, { useState, useEffect } from "react";
import "./Styles/Trip.scss";
import { svg, aminities } from "./svg";
import BoardingDropping from "./modal/droppingBoardingPoint";
import tagImg from "../asssests/tagImg.jpg";
import { DownOutlined } from "@ant-design/icons";
import { boardingPoints } from "./data";

export default function Trip() {
  // const [toggleAminities, setToggleAminities] = useState(false);

  // const [boardingDroppingPoints, setBoardingDroppingPoints] = useState(false);

  return (
    <div className="trips container">
      <div className="TripContainer">
        <div className="leftWrapper">
          <div className="upperItems">
            <div className="ads absolute">
              <p>AD</p>
            </div>
            <img src={tagImg} className="tagImg" alt="abhiAssuaranceTag" />

            <div className="flex tripInfo">
              <div className="NameAndType">
                <h3>IntrCity SmartBus (Washroom onboard)</h3>
                <p className="grey">AC Seater/Sleeper(2+1)</p>
              </div>
              <div className="timeInfo flex">
                <div className="departureData">
                  <p className="grey">16 sep</p>
                  <span>22:25</span>
                  <p className="grey">Bangalore</p>
                </div>
                <div className="duration flex grey">
                  - - -<p>07:10hrs</p>- - -
                </div>
                <div className="arrivalData">
                  <p className="grey">17 sept</p>
                  <span>05:35</span>
                  <p className="grey">Chennai</p>
                </div>
              </div>
            </div>
            {/* <div className="tripRecords flex">
              <div className="rating flex">
                <div className="avgRating flex">
                  <span dangerouslySetInnerHTML={{ __html: svg.ratingSvg }} />
                  <p>4.6</p>
                </div>
                <div className="totalRating flex">
                  <span dangerouslySetInnerHTML={{ __html: svg.usersRating }} />
                  <p className="grey">37.5k</p>
                </div>
              </div>

              <div className="aminities flex">
                {aminities?.slice(0, 3).map((item) => (
                  <span dangerouslySetInnerHTML={{ __html: item.img }} />
                ))}
              
                <span
                  className="aminitiesLength "
                  onClick={() => setToggleAminities(!toggleAminities)}
                >
                  +{aminities.slice(3).length}
                </span>
              </div>

              <div className="tracking flex">
                <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
                <p> Live Tracking</p>
              </div>
            </div> */}
          </div>
          <TripDetails />

          {/* <div className="moreDetails flex">
            <div
              className="flex"
              onClick={() => setBoardingDroppingPoints(!boardingDroppingPoints)}
            >
              <p className="grey">Boarding & Dropping Points </p>
              <p>
                <DownOutlined
                  className="downArrow grey"
                  // onClick={() =>
                  //   setBoardingDroppingPoints(!boardingDroppingPoints)
                  // }
                />{" "}
              </p>
            </div>

            <div className="verticalline"> </div>

            <div className="flex">
              <p
                className="grey"
                onClick={() => setToggleAminities(!toggleAminities)}
              >
                Amenities{" "}
              </p>
              <p>
                <DownOutlined className="downArrow grey" />
              </p>
            </div>
            <div className="verticalline"> </div>

            <br className="grey" />

            <div className="flex">
              <p className="grey">Cancellation Policy </p>
              <p>
                <DownOutlined className="downArrow grey" />
              </p>
            </div>

            <div className="verticalline"> </div>

            <div className="flex">
              <p className="grey">Travel Policy </p>
              <p>
                <DownOutlined className="downArrow grey" />
              </p>
              <div className="verticalline"> </div>
            </div>
          </div> */}
        </div>

        <div className="verticalline height"></div>
        <div className="rightWrapper">
          <div className="text-end">
            <p className="grey">Starting At</p>
            <span>₹ 2500.0</span>
          </div>
          <div className="text-end">
            <button className="showSeat">Show Seat</button>
            <p className="grey">29 Seats Available</p>
          </div>
        </div>
      </div>
      {/* <Aminities /> */}
      {/* {toggleAminities && (
        <div className="aminitesModal">
          <h5>Aminities</h5>
          <div>
            {aminities.map((item, index) => (
              <p className="">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.img.replace(
                      /stroke="[^"]*"/g,
                      'stroke="#444444"'
                    ),
                  }}
                />
                <span dangerouslySetInnerHTML={{ __html: item.name }} />
              </p>
              // <p key={`modal-${index}`}>{}</p>
            ))}
          </div>
        </div>
      )} */}
      {/* {boardingDroppingPoints && <BoardingDropping />} */}
    </div>
  );
}

const TripDetails = () => {
  // const [details, setDetails] = useState("");
  const [toggleAminities, setToggleAminities] = useState(false);
  const [boardingDroppingPoints, setBoardingDroppingPoints] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => {
      setToggleAminities(false);
      setBoardingDroppingPoints(false);
    });
  }, []);

  return (
    <>
      <TripRecord {...{ setToggleAminities }} />
      <MoreDetails {...{ setToggleAminities, setBoardingDroppingPoints }} />
      {boardingDroppingPoints && <BoardingDropping />}
      {toggleAminities && <Aminities />}
    </>
  );
};

const TripRecord = ({ setToggleAminities, setBoardingDroppingPoints }) => {
  return (
    <div className="tripRecords flex">
      <div className="rating flex">
        <div className="avgRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.ratingSvg }} />
          <p>4.6</p>
        </div>
        <div className="totalRating flex">
          <span dangerouslySetInnerHTML={{ __html: svg.usersRating }} />
          <p className="grey">37.5k</p>
        </div>
      </div>

      <div className="aminities flex">
        {aminities?.slice(0, 3).map((item) => (
          <span dangerouslySetInnerHTML={{ __html: item.img }} />
        ))}
        {/* {aminities?.map((item) => (
            <span
              dangerouslySetInnerHTML={{ __html: item.washroom.img }}
            />
          ))} */}
        {/* {aminities?.map((item) => (
            <span dangerouslySetInnerHTML={{ __html: item.ac.img }} />
          ))} */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setToggleAminities((prev) => !prev);
            // setToggleAminities("aminities");
            setBoardingDroppingPoints(false);
          }}
          className="aminitiesLength "
        >
          +{aminities.slice(3).length}
        </span>
      </div>

      <div className="tracking flex">
        <span dangerouslySetInnerHTML={{ __html: svg.liveTracking }} />
        <p> Live Tracking</p>
      </div>
    </div>
  );
};

const MoreDetails = ({ setBoardingDroppingPoints, setToggleAminities }) => {
  return (
    <div className="moreDetails flex">
      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          setBoardingDroppingPoints((prev) => !prev);
          setToggleAminities(false);
        }}
      >
        <p className="grey">Boarding & Dropping Points </p>
        <p>
          <DownOutlined
            className="downArrow grey"
            // onClick={() =>
            //   setBoardingDroppingPoints(!boardingDroppingPoints)
            // }
          />{" "}
        </p>
      </div>

      <div className="verticalline"> </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setToggleAminities((prev) => !prev);
          setBoardingDroppingPoints(false);
        }}
        className="flex"
      >
        <p className="grey">Amenities </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
      </div>
      <div className="verticalline"> </div>

      <br className="grey" />

      <div className="flex">
        <p className="grey">Cancellation Policy </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
      </div>

      <div className="verticalline"> </div>

      <div className="flex">
        <p className="grey">Travel Policy </p>
        <p>
          <DownOutlined className="downArrow grey" />
        </p>
        <div className="verticalline"> </div>
      </div>
    </div>
  );
};

const Aminities = () => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", zIndex: "10" }}
        className="aminitesModal"
      >
        <h5>Aminities</h5>
        <div>
          {aminities.map((item, index) => (
            <p className="">
              <span
                dangerouslySetInnerHTML={{
                  __html: item.img.replace(
                    /stroke="[^"]*"/g,
                    'stroke="#444444"'
                  ),
                }}
              />
              <span dangerouslySetInnerHTML={{ __html: item.name }} />
            </p>
          ))}
        </div>
      </div>
    </>
  );
};
