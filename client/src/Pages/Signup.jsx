import React, { useState } from "react";
import LogoB from "../assets/blackLogo.svg";
import Check from "../assets/CheckMark.svg";
import Log from "../assets/ForwardButton.svg";
import ToggleSwitch from "../Components/Switch";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Type: "Owner",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      Type: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fortexserver.vercel.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully");
        navigate("/login");
      } else {
        setValidationErrors(data.errors || []);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flex w-full h-screen font-pop">
      <div className="flex-col w-45 pt-28 pl-24 bg-lightblue">
        <img src={LogoB} alt="Black Fortex Logo" />
        {/* Additional Static Content */}
      </div>

      <div className="flex-col w-55 p-10 pt-16">
        <form onSubmit={handleSubmit} className="w-11/12 space-y-4">
          {/* First Name */}
          <div className="flex flex-col w-49 space-y-2">
            <label className="text-13 text-greyL">First Name</label>
            <input
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              placeholder="Enter your First Name"
              type="text"
              className={`bg-superLgrey h-12 rounded-xl px-5 ${
                validationErrors.some((err) => err.param === "FirstName")
                  ? "border-red-500"
                  : ""
              }`}
            />
            {validationErrors
              .filter((err) => err.param === "FirstName")
              .map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {err.msg}
                </p>
              ))}
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-49 space-y-2">
            <label className="text-13 text-greyL">Last Name</label>
            <input
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              type="text"
              className={`bg-superLgrey h-12 rounded-xl px-5 ${
                validationErrors.some((err) => err.param === "LastName")
                  ? "border-red-500"
                  : ""
              }`}
            />
            {validationErrors
              .filter((err) => err.param === "LastName")
              .map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {err.msg}
                </p>
              ))}
          </div>

          {/* Email */}
          <div className="flex flex-col w-full space-y-2">
            <label className="text-13 text-greyL">Email</label>
            <input
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              type="email"
              className={`bg-superLgrey h-12 rounded-xl px-5 ${
                validationErrors.some((err) => err.param === "Email")
                  ? "border-red-500"
                  : ""
              }`}
            />
            {validationErrors
              .filter((err) => err.param === "Email")
              .map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {err.msg}
                </p>
              ))}
          </div>

          {/* Password */}
          <div className="flex flex-col w-full space-y-2">
            <label className="text-13 text-greyL">Password</label>
            <input
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter your Password"
              type="password"
              className={`bg-superLgrey h-12 rounded-xl px-5 ${
                validationErrors.some((err) => err.param === "Password")
                  ? "border-red-500"
                  : ""
              }`}
            />
            {validationErrors
              .filter((err) => err.param === "Password")
              .map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {err.msg}
                </p>
              ))}
          </div>

          {/* Toggle Switch */}
          <div className="flex flex-col w-49 space-y-2">
            <label className="text-13 text-greyL">What are you looking to do?</label>
            <ToggleSwitch onChange={(type) => handleUserTypeChange(type)} />
          </div>

          <div>
            <button
              type="submit"
              className="bg-black text-white w-full h-12 rounded-full mt-5"
            >
              Get Access Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
