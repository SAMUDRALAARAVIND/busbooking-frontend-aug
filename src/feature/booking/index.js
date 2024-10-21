import BookingUI from "./BookingUI";
import BookingMobileUi from "./BookingMobileUI.js";
import Navbar from "../search/Navbar.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../network/request.js";
import Endpoints from "../../network/endpoints.js";
import LoginPage from "../auth/LoginPage.js";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "short",
  })} ${date.getFullYear()}`;
};

const BookingScreen = () => {
  const navigate = useNavigate();
  const cookieData =
    Cookies.get("selectedSeatData") &&
    JSON.parse(Cookies.get("selectedSeatData"));
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  console.log(token);

  if (cookieData) {
    const busFare = cookieData?.seats?.reduce(
      (total, item) => total + item.price,
      0
    );
    const gstAmount = busFare * 0.18;
    const totalFare = busFare + gstAmount;
    cookieData.busFare = busFare;
    cookieData.gstAmount = gstAmount;
    cookieData.totalFare = totalFare;
    cookieData.assuredCharge = 100;
    cookieData.departureDate = formatDate(cookieData.tripData.departureTime);
    cookieData.arrivalDate = formatDate(cookieData.tripData.arrivalTime);
  }

  useEffect(() => {
    if (!cookieData) {
      navigate("/");
    }
  }, []);

  if (!cookieData) {
    return;
  }

  if (!token) {
    return <LoginPage endpoint={"/book"} />;
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const payLoad = {
      tripId: cookieData?.tripId,
      boardingPointId: cookieData?.points?.boardingPoint?._id,
      droppingPointId: cookieData?.points?.droppingPoint?._id,
      pocDetails: {
        phoneNumber,
        email,
      },
      seatsInfo: [],
    };

    cookieData?.seats?.forEach((seatnum) => {
      let seat = seatnum.seatNumber;
      payLoad.seatsInfo.push({
        seatNumber: seat,
        name: form[`${seat}_name`]?.value,
        gender: form[`${seat}_gender`]?.value,
        age: form[`${seat}_age`]?.value,
      });
    });

    try {
      setLoading(true);
      const { success, data } = await request({
        url: Endpoints.booking,
        method: "post",
        data: payLoad,
      });
      if (success) {
        alert(data?.message ? data.message : "Booking Successful");
        navigate("/");
      } else {
        alert("Error occured please try again later");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error occured please try again later");
    }
  };

  return (
    <>
      <div className="booking-desktop">
        <Navbar />
        <BookingUI
          selectedSeatsData={cookieData}
          handelSubmit={handelSubmit}
          loading={loading}
        />
      </div>
      <div className="booking-mobile">
        <BookingMobileUi
          selectedSeatsData={cookieData}
          handelSubmit={handelSubmit}
          loading={loading}
        />
      </div>
    </>
  );
};

export default BookingScreen;
