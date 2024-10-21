import { Radio } from "antd";
import "./Sigmup.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Endpoints from "./../../network/endpoints";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = cookie.get("email") || "";

  const handelSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      fullName: e.target["fullName"].value,
      gender: e.target["gender"].value,
      dob: e.target["dob"].value,
      email: e.target["email"].value,
      contactNumber: e.target["contactNumber"].value,
      password: e.target["password"].value,
    };
    const res = await fetch(Endpoints.singUp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      navigate("/book");
    }
  };
  useEffect(() => {
    if (email.length === 0) navigate("/otp");
  }, []);
  return (
    <div className="signup-form">
      <form onSubmit={handelSubmit}>
        <p className="register-heading">Register</p>
        <div className="form-inner">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            id="name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            defaultValue={email}
            required
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            name="dob"
            id="age"
            required
          />
          <Radio.Group name="gender">
            <Radio value={"M"}>Male</Radio>
            <Radio value={"F"}>Female</Radio>
          </Radio.Group>
          <label htmlFor="Contact-number">Phone</label>
          <input
            type="number"
            placeholder="Contact number"
            name="contactNumber"
            id="Contact-number"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
          />
          <button className="signup-btn">Register</button>
        </div>
        <p>
          Already have an acount ?{" "}
          <span onClick={() => navigate("/login")}>Login Now</span>
        </p>
      </form>
    </div>
  );
};

{
  /* <Input placeholder="Name" />;
<Radio.Group>
    <Radio value={"male"}>Male</Radio>
    <Radio value={"female"}>Female</Radio>
</Radio.Group>
<DatePicker placeholder="Date of Birth" />
<Input.Password placeholder="Password" /> */
}

export default Signup;
