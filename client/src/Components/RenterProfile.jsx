import React, { useEffect, useState } from "react";
import Header from "./Header";

const RenterProfile = ()=>{
    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
      });
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
    
      const [loading, setLoading] = useState(false); // For API calls
    
      useEffect(() => {
        const fetchRenterData = async () => {
          try {
            const response = await fetch("http://localhost:4000/user/profile", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setUserData(data); // Set the fetched data
              setEmail(data.Email); // Initialize the email input
              setPhone(data.PhoneNumber || ""); // Initialize the phone input
            } else {
              console.error("Failed to fetch profile data.");
            }
          } catch (error) {
            console.error("Error fetching renter data:", error);
          }
        };
    
        fetchRenterData();
      }, []);
    
      const handleSave = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:4000/user/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ Email: email, PhoneNumber: phone }),
          });
    
          if (response.ok) {
            alert("Profile updated successfully!");
          } else {
            const error = await response.json();
            console.error("Backend Error:", error);
            alert(`Failed to update profile: ${error.message}`);
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        } finally {
          setLoading(false);
        }
      };
    


    return(
        <section className="w-10/12 mx-auto flex flex-col font-pop">
            <Header />
            <div className="mt-24 w-10/12 mx-auto">
        <h2 className="text-36 font-bold">Renter Profile</h2>
        <div className="mt-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-lg font-medium">Full Name</label>
            <input
              type="text"
              value={`${userData.FirstName || ""} ${userData.LastName || ""}`}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-lg font-medium">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 text-white rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
            }`}
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </div>
        </section>
    )
}

export default RenterProfile;