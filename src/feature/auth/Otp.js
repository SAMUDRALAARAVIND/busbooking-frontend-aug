import "./Sigmup.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Endpoints from "../../network/endpoints";
import cookie from "js-cookie";

const Otp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVerifing, setIsVerifing] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      email: e.target["email"].value,
    };
    let url = Endpoints.getOtp;
    if (isVerifing) {
      payLoad.otp = e.target["otp"].value;
      url = Endpoints.verifyOtp;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });

    if (isVerifing && res.status === 200) {
      const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
      cookie.set("email", payLoad.email, { expires });
      navigate("/signup");
    }
    if (res.status === 200 && !isVerifing) {
      setIsVerifing(true);
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handelSubmit}>
        <p className="register-heading">Register</p>
        <div className="form-inner">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            required
          />
          {isVerifing && (
            <>
              <label htmlFor="otp">Otp</label>
              <input
                type="number"
                placeholder="Enter The Otp"
                name="otp"
                id="otp"
                required
              />
            </>
          )}
          {isVerifing ? (
            <button id="verfiy-otp" className="signup-btn">
              Verify
            </button>
          ) : (
            <button className="signup-btn">Get Otp</button>
          )}
        </div>
        <p>
          Already have an acount ?{" "}
          <span onClick={() => navigate("/login")}>Login Now</span>
        </p>
      </form>
    </div>
  );
};

export default Otp;
