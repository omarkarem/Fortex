import React,{useState} from "react";
import Logo from "../assets/blackLogo.svg";
import arrow from "../assets/DropDown.svg";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const navigate = useNavigate(); // React Router hook for navigation


    const handleLogout = () => {
      // Clear token from localStorage
      localStorage.removeItem("token");
      // Redirect to login page
      navigate("/login");
    };
  

    return(
        <div className="mt-10 w-full h-16 flex justify-between px-24">
            <div>
                <img src={Logo} alt="Fortex Black Logo" />
            </div>
            <div className="flex items-center space-x-4">
            <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full"
                 onClick={toggleDropdown} >
            <img className="w-6 h-6" src={arrow} alt="Arrow" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-22 right-56 bg-white border border-gray-200 rounded shadow-md z-10">
            <ul className="py-2">
              <li>
                <a href="/properties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Properties
                </a>
              </li>
              <li>
                <a href="/renter/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
              </li>
              <li>
              <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

            <div className="w-14 h-14 rounded-full bg-black">
                <img className="w-full h-full object-cover rounded-full" src="https://via.placeholder.com/150" alt="Profile image" />
            </div>
            </div>
        </div>
    )
}

export default Header;