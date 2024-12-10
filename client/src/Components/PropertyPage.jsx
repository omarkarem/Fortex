import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import bed from "../assets/Bed.svg";
import bath from "../assets/Shower.svg";
import size from "../assets/Height.svg";
import book from "../assets/PayDate.svg";

const PropertyPage = ()=>{

    return(
        <>
        <Header />
        <section className="w-10/12 h-content mx-auto flex flex-col mb-20">
        <div className="w-full h-96 bg-greyL rounded-xl my-20">
            <img src="" alt="" className="h-full w-full rounded-xl" />
        </div>
        <div className="flex">
            <div className="flex flex-col w-55 pr-24">
                <p className="text-36 font-medium leading-36 pr-20">Nasr City Appartment in mostafa nahas</p>
                <p className="text-24 font-semibold my-4">Description</p>
                <p className="text-24 leading-24">Meet our new concept of a real estate renting app. With its help, users can filter available apartments, see them on the map, and contact landowners to arrange the rental process. Take a closer look at this interface and share your opinion!</p>
            </div>
            <div className="flex flex-col border-2 w-45 my-2 rounded-md p-14">
                <p className="text-18"><strong>Owner: </strong>Omar Gamal</p>
                <div className="w-95 border-2 flex items-center justify-between py-4 px-16 rounded-xl my-4">
                <div className="flex">
                    <img src={bed} alt="bed" />
                    <p className="text-16 ml-4">1</p>
                </div>
                <div className="flex">
                    <img src={bath} alt="bath" />
                    <p className="text-16 ml-4">1</p>
                </div>
                <div className="flex">
                    <img src={size} alt="size" />
                    <p className="text-16 ml-4">120 sqft</p>
                </div>
            </div>
            <div className="text-36 font-bold">9500 / <span className="text-31 text-greyL font-normal">month</span></div>
                <div className="flex">
                    <button className="bg-black px-36 py-4 text-white text-18 rounded-xl my-5">Rent Now</button>
                    <button className="bg-white ml-2 p-1">
                      <img className="border-2 p-3 rounded-xl" src={book} alt="" />
                   </button>
                </div>
            </div>
        </div>
        <div className="w-full text-36 font-semibold my-8">
            <p>Our Recommendations</p>
        </div>


        </section>
        <Footer />
        </>
    )
}


export default PropertyPage;