import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Property from "../Components/Property";
import Footer from "../Components/Footer";
import Search from "../Components/Search";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
        const response = await fetch("https://fortexserver.vercel.app/properties/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
};

  // Fetch all properties on page load
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <section className="w-11/12 mx-auto mb-12 bg-white flex flex-col justify-center font-pop">
        <Header />
        <Search onSearch={fetchProperties} />
        <div className="w-11/12 h-auto mx-auto flex flex-wrap overflow-hidden">
          {properties.map((property) => (
            <Property
              key={property._id}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              price={property.price}
              type={property.type}
              size={property.size}
              image={property.image}
            />
          ))}
        </div>
        <button className="flex w-fit mx-auto my-7 p-3 px-6 pt-2 text-black text-xl font-semibold bg-Turqoise rounded-full">
          Show more
        </button>
      </section>
      <Footer />
    </>
  );
};

export default Properties;
