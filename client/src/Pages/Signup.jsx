import React, { useState } from "react";
import LogoB from "../assets/blackLogo.svg";
import Check from "../assets/CheckMark.svg";
import Log from "../assets/ForwardButton.svg";
import ToggleSwitch from "../Components/Switch";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [validationErrors, setValidationErrors] = useState([]); // Server-side errors
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Type: "Owner", // Default value from ToggleSwitch
  });

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

  // Fetching /auth/register endpoint to register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fortexserver.vercel.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully");
        navigate("/login");
      } else {
        // Display validation errors
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
        <p className="text-black font-normal text-20 leading-20 mt-5 w-11/12">
          Ready to find your dream home or rent out your property? Sign up today and take the next step!
        </p>
        {/* Features Section */}
        {[
          {
            title: "Seamless Search & Listing Experience",
            description:
              "Renters find their perfect home, and owners list properties with ease—all in one platform.",
          },
          {
            title: "Verified Listings & Secure Transactions",
            description:
              "Renters explore verified properties with confidence, while owners enjoy secure payments and lease management.",
          },
          {
            title: "24/7 Support for Renters and Owners",
            description:
              "Get real-time assistance for any needs—whether you’re searching for a home or managing a property.",
          },
        ].map((feature, index) => (
          <div key={index} className="flex my-14">
            <img src={Check} alt="Check Mark" />
            <div className="flex-col mx-4 pt-1 w-9/12">
              <p className="text-black text-20 leading-20 font-medium">{feature.title}</p>
              <p className="text-base leading-4 text-greyL font-normal mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form Part */}
      <div className="flex-col w-55 p-10 pt-16">
        <div className="text-greyL text-base flex items-center justify-end">
          <p className="mr-1">Have an account?</p>
          <a id="Login" href="/login" className="text-black font-medium flex items-center">
            Log in
            <img src={Log} alt="Login" className="mr-1" />
          </a>
        </div>
        <div className="text-black font-medium text-24 mt-28 mb-4 pb-3 border-b-2 w-11/12">
          Create Your Account
        </div>
        <form onSubmit={handleSubmit} className="w-11/12 space-y-4">
          {/* Name Fields */}
          <div className="flex space-x-4">
            <div className="flex flex-col w-49 space-y-2">
              <label className="text-13 text-greyL">First Name</label>
              <input
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
                type="text"
                className="bg-superLgrey h-12 rounded-xl px-5"
              />
              {validationErrors.FirstName && (
                <p className="text-red-500 text-sm">{validationErrors.FirstName}</p>
              )}
            </div>
            <div className="flex flex-col w-49 space-y-2">
              <label className="text-13 text-greyL">Last Name</label>
              <input
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                type="text"
                className="bg-superLgrey h-12 rounded-xl px-5"
              />
              {validationErrors.LastName && (
                <p className="text-red-500 text-sm">{validationErrors.LastName}</p>
              )}
            </div>
          </div>
          {/* Email Field */}
          <div className="flex flex-col w-full space-y-2">
            <label className="text-13 text-greyL">Email</label>
            <input
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              type="email"
              className="bg-superLgrey h-12 rounded-xl px-5"
            />
            {validationErrors.Email && <p className="text-red-500 text-sm">{validationErrors.Email}</p>}
          </div>
          {/* Password Field */}
          <div className="flex space-x-4">
            <div className="flex flex-col w-49 space-y-2">
              <label className="text-13 text-greyL">Password</label>
              <input
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Enter your Password"
                type="password"
                className="bg-superLgrey h-12 rounded-xl px-5"
              />
              {validationErrors.Password && (
                <p className="text-red-500 text-sm">{validationErrors.Password}</p>
              )}
            </div>
            <div className="flex flex-col w-49 space-y-2">
              <label className="text-13 text-greyL">What are you Looking to do?</label>
              <ToggleSwitch onChange={(type) => handleUserTypeChange(type)} />
            </div>
          </div>
          <div>
            <button type="submit" className="bg-black text-white w-full h-12 rounded-full mt-5">
              Get Access Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
