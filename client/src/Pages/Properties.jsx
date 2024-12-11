import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Property from "../Components/Property";
import Footer from "../Components/Footer";
import Search from "../Components/Search";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch properties with optional location parameter
  const fetchProperties = async (location = "") => {
    try {
      let url = "https://fortexserver.vercel.app/properties/all";
      
      // If a location is provided, add a query parameter for filtering
      if (location) {
        url += `?location=${encodeURIComponent(location)}`;
      }

      const response = await fetch(url, {
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

  // Fetch all properties on initial load
  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle search callback passed to the Search component
  const handleSearch = (searchTerm) => {
    // Re-fetch properties based on the search term
    fetchProperties(searchTerm);
  };

  return (
    <>
      <section className="w-11/12 mx-auto mb-12 bg-white flex flex-col justify-center font-pop">
        <Header />
        <Search onSearch={handleSearch} />
        <div className="w-11/12 h-auto mx-auto flex flex-wrap overflow-hidden">
          {properties.map((property) => (
            <div
              key={property._id}
              onClick={() => navigate(`/property/${property._id}`)}
              className="cursor-pointer"
            >
              <Property
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                price={property.price}
                type={property.type}
                size={property.size}
                image={property.image}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Properties;
