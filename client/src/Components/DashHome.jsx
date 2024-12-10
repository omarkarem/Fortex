import React, { useState, useEffect } from "react";
import arrow from "../assets/Arrow.svg"


const DashHome = ()=>{
    const [userProperties, setUserProperties] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [propertyCount, setPropertyCount] = useState(0);

    // Fetch user properties
    const fetchUserProperties = async () => {
      try {
        const response = await fetch("https://fortexserver.vercel.app/properties", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProperties(data);
        } else {
          console.error("Failed to fetch user properties");
        }
      } catch (error) {
        console.error("Error fetching user properties:", error);
      }
    };

    useEffect(() => {
      fetchUserProperties();
    }, []);



    // Fetch Total Revenue
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch("https://fortexserver.vercel.app/properties/total-revenue", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTotalRevenue(data.totalRevenue);
        } else {
          console.error("Failed to fetch total revenue");
        }
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };
  
    // Fetch Property Count
    const fetchPropertyCount = async () => {
      try {
        const response = await fetch("https://fortexserver.vercel.app/properties/property-count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPropertyCount(data.propertyCount);
        } else {
          console.error("Failed to fetch property count");
        }
      } catch (error) {
        console.error("Error fetching property count:", error);
      }
    };
  
    // Fetch data on component mount
    useEffect(() => {
      fetchTotalRevenue();
      fetchPropertyCount();
    }, []);
  
    
    return(
        <section className="flex flex-col w-95 mx-auto font-pop">
            <div className="w-full h-185 flex flex-col align-center bg-black justify-center my-8 rounded-xl">
                <p className="text-31 leading-36 text-white ml-12">Manage everything at one Dashboard</p>
                <p className="text-18 leading-18 text-white ml-12 mt-1 font-extralight">View, Add, and Manage your properties</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p className="text-26 leading-26 font-medium text-black ml-6">YourProperties</p>
            </div>

            <div className="w-full h-content bg-superLgrey rounded-xl my-8 pb-6">
                <div className="w-95 flex justify-between bg-white rounded-xl border-2 border-greyL py-2 px-4 mx-auto my-8">
                    <p className="text-14 font-medium text-black">Property Name</p>
                    <p className="text-14 font-medium text-black">Bedrooms</p>
                    <p className="text-14 font-medium text-black">Bathrooms</p>
                    <p className="text-14 font-medium text-black">Total Size</p>
                    <p className="text-14 font-medium text-black">Tenant Name</p>
                    <p className="text-14 font-medium text-black">Price/Month</p>
                </div>
                {userProperties.map((property) => (
                  <div
                    key={property._id}
                    className="w-95 flex items-center py-2 px-4 mx-auto my-2 rounded-xl"
                  >
                    <p className="w-60 text-14 font-normal text-black">
                      {property.location || "N/A"}
                    </p>
                    <p className="w-40 text-14 font-normal text-black">
                      {property.bedrooms || "N/A"}
                    </p>
                    <p className="w-36 text-14 font-normal text-black">
                      {property.bathrooms || "N/A"}
                    </p>
                    <p className="w-48 text-14 font-normal text-black">
                      {property.size || "N/A"} sqft
                    </p>
                    <p className="w-44 text-14 font-normal text-black">
                      {property.tenant || "N/A"}
                    </p>
                    <p className="w-16 text-14 font-normal text-black">
                      {property.price || "N/A"} $
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="w-49 h-content bg-superLgrey flex flex-col rounded-xl my-8 pb-6">
                    <div className="w-95 mx-auto bg-white rounded-xl my-4 px-6 py-4">
                        <p className="font-greyL text-14">Total Revenue</p>
                        <p className="text-black text-24 font-semibold">${totalRevenue}</p>
                    </div>
                    <button className="flex bg-transparent px-6 py-1 text-start">View your tenants<img src={arrow}></img></button>
                </div>
                <div className="w-49 h-content bg-superLgrey flex flex-col rounded-xl my-8 pb-6">
                    <div className="w-95 mx-auto bg-white rounded-xl my-4 px-6 py-4">
                        <p className="font-greyL text-14">Property Count</p>
                        <p className="text-black text-24 font-semibold">{propertyCount}</p>
                    </div>
                    <button className="flex bg-transparent px-6 py-1 text-start">View your Properties<img src={arrow}></img></button>
                </div>
            </div>
            <div className="w-full flex justify-end my-4">
                <button className="bg-black text-white text-16 py-2 px-8 rounded-md">Logout</button>
            </div>
        </section>
    )
}

export default DashHome;