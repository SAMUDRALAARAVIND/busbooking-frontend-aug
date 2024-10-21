import {  Radio } from "antd"
import "./Sigmup.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handelSubmit = (e) => {
        e.preventDefault()
        const pauLoad = {
            fullName: e.target['fullName'].value,
            gender: e.target['gender'].value,
            dob: e.target['dob'].value,
            email: e.target['email'].value,
            contactNumber: e.target['contactNumber'].value,
            password: e.target['password'].value
        }
    }

    return (
        <div className="signup-form">

            <form onSubmit={handelSubmit}>
                <p className="register-heading">Register</p>
                <div className="form-inner">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="Enter your name" name="fullName" id="name" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter your email" name="email" id="email" required />
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="Enter your age" name="dob" id="age" required />
                    <Radio.Group name="gender">
                        <Radio value={"M"}>Male</Radio>
                        <Radio value={"F"}>Female</Radio>
                    </Radio.Group>
                    <label htmlFor="Contact-number">Phone</label>
                    <input type="number" placeholder="Contact number" name="contactNumber" id="Contact-number" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" id="password" required />
                    <button className="signup-btn">Register</button>
                </div>
                <p>Already have an acount ? <span
                    onClick={() => navigate("/login")}
                >Login Now</span></p>
            </form>
        </div>
    )
}


{/* <Input placeholder="Name" />;
<Radio.Group>
    <Radio value={"male"}>Male</Radio>
    <Radio value={"female"}>Female</Radio>
</Radio.Group>
<DatePicker placeholder="Date of Birth" />
<Input.Password placeholder="Password" /> */}


export default Signup