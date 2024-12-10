import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Property from "../Components/Property";
import Footer from "../Components/Footer";

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    // Fetch all properties on page load
    useEffect(() => {
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

        fetchProperties();
    }, []);

    return (
        <>
            <section className="w-11/12 mx-auto mb-12 bg-white flex flex-col justify-center font-pop">
                <Header />
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
