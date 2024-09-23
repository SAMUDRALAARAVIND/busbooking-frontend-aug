import React, { useState } from "react";
import "./Otp.scss";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="otp-verification-container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleChange}
          placeholder="Enter your OTP"
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
