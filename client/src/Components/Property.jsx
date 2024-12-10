import React from "react";
import Bed from "../assets/Bed.svg"
import Shower from "../assets/Shower.svg"

const Property = ({ location, bedrooms, bathrooms, price, type, size, image })=>{
     return(
        <div className="w-280 h-auto my-8 mx-4">
            <div className="w-280 h-248 bg-superLgrey rounded-2xl">
            </div>
            <p className="text-black ml-2 text-24 leading-24 my-2">{location}</p>
            <div className="flex">
                <div className="flex mr-2">
                    <p className="text-black text-24 leading-24 mx-2">{bedrooms}</p>
                    <img src={Bed} alt="Bed" />
                </div>
                <div className="flex ml-2">
                <p className="text-black text-24 leading-24 mx-2">{bathrooms}</p>
                <img src={Shower} alt="Bed" />
                </div>
            </div>
            <p className="text-black ml-2 text-24 leading-24 my-2">{price} EGP</p>
        </div>
     )
}
export default Property;