import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Property from "../Components/Property";
import Footer from "../Components/Footer";
import Search from "../Components/Search";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const fetchProperties = async (location = "") => {
    try {
      let url = "https://fortexserver.vercel.app/properties/all";
      if (location.trim()) {
        // If there's a search term, use the /search endpoint
        url = `https://fortexserver.vercel.app/properties/search?location=${encodeURIComponent(location)}`;
      }

      console.log("Fetching from URL:", url); // Debug log

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      console.log("Fetched properties:", data); // Debug log
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    // On initial load, fetch all properties (no location filter)
    fetchProperties();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log("handleSearch called with:", searchTerm); // Debug log
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
