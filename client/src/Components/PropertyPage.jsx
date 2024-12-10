import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import bed from "../assets/Bed.svg";
import bath from "../assets/Shower.svg";
import size from "../assets/Height.svg";
import book from "../assets/PayDate.svg";
import Property from "../Components/Property";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

    // Fetch property details
    useEffect(() => {
        const fetchProperty = async () => {
          try {
            const response = await fetch(`https://fortexserver.vercel.app/properties/${id}`);
            if (!response.ok) {
              console.error("Failed to fetch property details");
              return;
            }
            const data = await response.json();
            setProperty(data);
      
            // Fetch recommendations
            const recResponse = await fetch(
              `https://fortexserver.vercel.app/properties/recommendations?price=${data.price}`
            );
            if (!recResponse.ok) {
              console.error("Failed to fetch recommendations");
              return;
            }
            const recData = await recResponse.json();
            setRecommendations(recData);
          } catch (error) {
            console.error("Error fetching property or recommendations:", error);
          }
        };
      
        fetchProperty();
      }, [id]);

  return (
    <>
      <Header />
      <section className="w-10/12 h-content mx-auto flex flex-col mb-20">
        <div className="w-full h-96 bg-greyL rounded-xl my-20">
          <img src={property.image} alt={property.location} className="h-full w-full rounded-xl" />
        </div>
        <div className="flex">
          <div className="flex flex-col w-55 pr-24">
            <p className="text-36 font-medium leading-36 pr-20">{property.location}</p>
            <p className="text-24 font-semibold my-4">Description</p>
            <p className="text-24 leading-24">{property?.description || "No description available"}</p>
          </div>
          <div className="flex flex-col border-2 w-45 my-2 rounded-md p-14">
            <p className="text-18">
              <strong>Owner: </strong>
              {property.ownerName}
            </p>
            <div className="w-95 border-2 flex items-center justify-between py-4 px-16 rounded-xl my-4">
              <div className="flex">
                <img src={bed} alt="bed" />
                <p className="text-16 ml-4">{property.bedrooms}</p>
              </div>
              <div className="flex">
                <img src={bath} alt="bath" />
                <p className="text-16 ml-4">{property.bathrooms}</p>
              </div>
              <div className="flex">
                <img src={size} alt="size" />
                <p className="text-16 ml-4">{property.size} sqft</p>
              </div>
            </div>
            <div className="text-36 font-bold">
              ${property.price} / <span className="text-31 text-greyL font-normal">month</span>
            </div>
            <div className="flex">
              <button className="bg-black px-36 py-4 text-white text-18 rounded-xl my-5">Rent Now</button>
              <button className="bg-white ml-2 p-1">
                <img className="border-2 p-3 rounded-xl" src={book} alt="Book" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full text-36 font-semibold my-8">
          <p>Our Recommendations</p>
        </div>
        <div className="flex flex-wrap">
          {Array.isArray(recommendations) && recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <Property
                key={rec._id}
                location={rec.location}
                bedrooms={rec.bedrooms}
                bathrooms={rec.bathrooms}
                price={rec.price}
                type={rec.type}
                size={rec.size}
                image={rec.image}
              />
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PropertyPage;
