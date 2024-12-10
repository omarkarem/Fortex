import React, { useState, useEffect } from "react";


const Settings = ()=>{
    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
      });

      const [email, setEmail] = useState(""); // For editable email
      const [loading, setLoading] = useState(false); // For API calls

        // Fetch User Data on Load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://fortexserver.vercel.app/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserData(data); // Set the fetched data
        setEmail(data.Email); // Initialize the email input
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle Email Update
  const handleEmailUpdate = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("https://fortexserver.vercel.app/user/update-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ Email: email }),
      });

      if (response.ok) {
        alert("Email updated successfully!");
      } else {
        const error = await response.json();
        console.error("Error updating email:", error);
        alert("Failed to update email.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("https://fortexserver.vercel.app/user/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        alert("Account deleted successfully!");
        window.location.href = "/login"; // Redirect to login
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };


    return(
        <section className="flex flex-col w-95 mx-auto font-pop">
            <div className="flex flex-col text-start my-20">
                <p className="text-36 font-medium leading-36 mx-8 mb-3">Settings</p>
                <p className="text-18 text-greyL font-light leading-18 mx-8">General options for your account</p>
            </div>
            <div className="flex">
                <div className="flex flex-col w-1/2">
                    <p className="text-20 font-light leading-20 mx-8 mb-1">Settings</p>
                    <p className="text-14 text-greyL font-light leading-14 mx-8">General options for your account</p>
                </div>
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/150" alt="profile" className="w-14 h-14 rounded-full ml-4 mr-2" />
                    <p className="text-black text-18 font-light">Choose</p>
                </div>
            </div>
            <div className="border-y-2 border-y-superLgrey py-4 my-8 w-95 mx-auto">
            <div className="flex items-center">
                <label className="text-24" htmlFor="username">UserName</label>
                <input id="username" type="text" placeholder="username" value={`${userData.FirstName} ${userData.LastName}`} readOnly className="bg-superLgrey py-2 px-4 rounded-xl w-1/2 ml-auto text-18" />
            </div>
                <div className="flex items-center my-8">
                    <label className="text-24" htmlFor="Email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="Email" type="text" placeholder="Email" value={email} className="bg-superLgrey py-2 px-4 rounded-xl w-1/2 ml-auto text-18" />
                </div>
                <div className="flex justify-end">
        <button
          onClick={handleEmailUpdate}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          {loading ? "Saving..." : "Save Email"}
        </button>
      </div>
            </div>
            
            <div className="flex justify-between w-30 ml-auto mr-6">
                <div className="w-full flex justify-end my-4">
                    <button onClick={handleLogout} className="bg-black text-white text-16 py-2 px-8 rounded-md">Logout</button>
                </div>
                <div className="w-full flex justify-end my-4">
                    <button onClick={handleDeleteAccount} className="bg-red text-white text-16 py-2 px-4 rounded-md">Delete Account</button>
                </div>
            </div>

        </section>

    )
}

export default Settings;