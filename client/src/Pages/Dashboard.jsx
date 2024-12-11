import React,{useState,useEffect} from "react";
import LogoW from "../assets/whiteLogo.svg";
import home from "../assets/Home.svg"
import listing from "../assets/Listing.svg"
import booking from "../assets/Booking.svg"
import tenant from "../assets/Tenant.svg"
import DashHome from "../Components/DashHome";
import DashListings from "../Components/DashListings";
import DashTenant from "../Components/DashTenant";
import gear from "../assets/settings.svg";
import Settings from "../Components/Settings";

const Dashboard = ()=>{
    const [active, setActive] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({ FirstName: "", LastName: "", Email: "" });

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch("https://fortexserver.vercel.app/user/profile", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const data = await response.json();
            setUser(data); // Set the fetched data
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const buttonClass = (name) =>
        `w-11/12 rounded-xl mt-1 mx-auto hover:bg-dashboardGrey transition duration-300 ${
            active === name ? "bg-dashboardGrey" : "hover:bg-dashboardGrey"
        }`;

    return(
        <section className="w-full h-screen flex font-pop bg-black">
            <div className="w-1/4 h-content flex flex-col">
                <div className="border-b-4 border-b-line mb-8">
                    <img className="w-1/2 ml-10 my-8" src={LogoW} alt="Fortex Logo" />
                </div>
                <div className={buttonClass("home")}>
                    <button onClick={()=> setActive("home")} className="py-3 px-4 rounded-full text-white text-18 flex felx-col"><img className="mr-2" src={home} alt="Home"></img>Home</button>
                </div>
                <div className={buttonClass("listings")}>
                    <button onClick={()=> setActive("listings")} className="py-3 px-4 rounded-full text-white text-18 flex felx-col"><img className="mr-2" src={listing} alt="Home"></img>My Listings</button>
                </div>
                <div className={buttonClass("tenants")}>
                    <button onClick={()=> setActive("tenants")} className="py-3 px-4 rounded-full text-white text-18 flex felx-col"><img className="mr-2" src={tenant} alt="Home"></img>Tenants</button>
                </div>
                <div className="w-full mt-auto mb-4">
                    <div className={buttonClass("settings")}>
                    <button onClick={()=> setActive("settings")} className="py-3 px-4 rounded-full text-white text-18 flex felx-col"><img className="mr-2" src={gear} alt="Settings"></img>Settings</button>
                    </div>
                    <div className="border-t-2 border-t-line flex items-center justify-between px-4 py-2">
                        <div className="flex items-center my-4">
                            <img src="https://via.placeholder.com/150" alt="profile" className="w-7 h-7 rounded-full ml-4 mr-2" />
                            <p className="text-white text-18 font-medium">{user.FirstName} {user.LastName}</p>
                        </div>
                        {/* Dots Menu */}
                        <button
                            onClick={toggleDropdown}
                            className="text-white text-lg font-bold focus:outline-none"
                        >
                            ...
                        </button>
                
                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute bottom-0 left-60 bg-white text-black text-sm rounded-md shadow-lg">
                                <ul>
                                    <li onClick={() => setActive("settings")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                    <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div className="w-3/4 h-content bg-white rounded-2xl mx-2 my-2 overflow-y-scroll">
            {active === "home" && <DashHome />}
            {active === "listings" && <DashListings />}
            {active === "settings" && <Settings />} 
            {active === "tenat" && <DashTenant />}
            </div>
        </section>
    )
};

export default Dashboard;