import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DashTenant = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      navigate("/login");
      return;
    }

    const fetchOwnerProperties = async () => {
      try {
        const response = await fetch("https://fortexserver.vercel.app/properties/owner-with-tenants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch owner properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching owner properties:", error);
      }
    };

    fetchOwnerProperties();
  }, [navigate]);

  return (
    <>
      <Header />
      <section className="w-10/12 mx-auto font-pop my-8">
        <div className="w-full h-185 flex flex-col align-center bg-black justify-center my-8 rounded-xl">
          <p className="text-31 leading-36 text-white ml-12">
            Your Properties with Tenant Info
          </p>
          <p className="text-18 leading-18 text-white ml-12 mt-1 font-extralight">
            View your properties and see who is renting them
          </p>
        </div>

        <div className="w-full h-content bg-superLgrey rounded-xl my-8 pb-6">
          <div className="w-95 flex justify-between bg-white rounded-xl border-2 border-greyL py-2 px-4 mx-auto my-8">
            <p className="text-14 font-medium text-black">Property Name</p>
            <p className="text-14 font-medium text-black">Tenant Name</p>
            <p className="text-14 font-medium text-black">Price/Month</p>
          </div>

          {properties.map((property) => (
            <div key={property._id} className="w-95 flex items-center justify-between py-2 px-4 mx-auto my-2 relative">
              <p className="w-56 text-14 font-normal text-black">
                {property.location || "N/A"}
              </p>
              <p className="w-44 text-14 font-normal text-black">
                {property.tenantId
                  ? `${property.tenantId.FirstName} ${property.tenantId.LastName}`
                  : "N/A"}
              </p>
              <p className="w-16 text-14 font-normal text-black">
                {property.price || "N/A"} $
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DashTenant;
