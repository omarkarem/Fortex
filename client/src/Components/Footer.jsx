import React from "react";
import LogoB from "../assets/blackLogo.svg";


const Footer = ()=>{

    return(
        <footer className="font-pop">
            <div className="flex justify-between w-3/4 mx-auto">
                <div className="flex-col">
                    <img src={LogoB} alt="Fortex Logo" />
                    <p className="text-xs text-black w-1/2 mt-5 mb-20">We are a rental property management company dedicated to connecting renters with quality homes.</p>
                </div>
                {/* column2 */}
                <div className="flex w-2/6 justify-between pl-28">
                    <div className="flex flex-col">
                        <a href="#i" className="text-base text-black mb-1">How it Works</a>
                        <a href="#i" className="text-base text-black mb-1">Why Fortex</a>
                        <a href="#i" className="text-base text-black mb-1">FAQ</a>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base text-black">Social Media</p>
                    </div>
                </div>
            </div>
            <div className="flex w-3/4 mx-auto justify-between">
                <div className="flex space-x-3 mb-20 ">
                    <p className="text-xs text-greyL">Terms & Conditions</p>
                    <p className="text-xs text-greyL">Privacy Policy</p>
                </div>
                <p className="text-xs text-greyL"> © 2024 Fortex Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;