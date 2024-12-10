import React from "react";
import LogoW from "../assets/whiteLogo.svg";
import plus from "../assets/+.svg";
import bell from "../assets/bell.svg";
import gear from "../assets/gear.svg";
import img from "../assets/Rectangle.svg";
import Footer from "../Components/Footer";

const Home = ()=>{

    return(
        <>
        <nav className="fixed w-4/5 top-20 left-0 right-0 mx-auto bg-black rounded-2xl h-20 py-4 px-10 z-10 font-pop">
            <div className="flex items-center">
                <img src={LogoW} alt="Logo White" />
                <div className="flex space-x-6 text-white text-Dnav mx-20">
                <a className="" href="#About">About Us</a>
                <a className="" href="#How">How it Works</a>
                <a className="" href="#Why">Why Fortex</a>
            </div>
            <a href="/signup" className="ml-auto p-3 px-6 pt-2 text-black text-xl font-semibold bg-Turqoise rounded-full">Start For Free</a>
            </div>
        </nav>
        <div className="relative font-pop w-11/12 h-685 mx-auto mt-28 mb-10 bg-lightblue bg-opacity-50 rounded-3xl">
            <div className="flex-col w-4/5 mx-auto pt-32 justify-center">
                <div className="p-3 px-6 pt-2 w-fit mx-auto rounded-full text-black bg-white">
                    <p><strong>Fortex</strong>: Your Rental & Property Solution</p>
                </div>
                <h1 className="font-medium text-Hero text-black my-7 mx-auto text-center leading-90">Rent with Ease Manage with Confidence</h1>
                <p className="w-4/5 mx-auto text-20 leading-20 text-center text-greyL font-medium">Whether you’re searching for your next home or looking to rent out your property, we offer seamless solutions that make the process simple, efficient, and stress-free.</p>
                <div className="flex space-x-6 w-4/5 mt-11 mb-2 mx-auto justify-center">
                    <a href="#start" className="p-3 px-6 pt-2 text-20 text-balck font-semibold bg-Turqoise rounded-full">Start for free</a>
                    <a href="#start" className="p-3 px-6 pt-2 text-20 text-white font-semibold bg-black rounded-full">Book Demo</a>
                </div>
                <p className="text-greyL text-center text-20 font-normal">No Credit card required</p>
            </div>
        </div>

        {/* section 2 */}
        <section className="relative w-11/12 h-600 mx-auto my-10 bg-lightblue bg-opacity-50 rounded-3xl font-pop">
            <div className="w-4/5 mx-auto pt-32">
                <div className="flex w-44 h-14 p-3 py-2 px-2 rounded-2xl bg-superLgrey shadow-custom-inner">
                    <button className="p-2 px-4 pt-1 text-base text-balck font-semibold bg-white rounded-2xl">Owner</button>
                    <button className="p-2 px-4 pt-1 text-base text-balck font-semibold bg-transparent rounded-2xl">Renter</button>  
                </div>
                {/* Title */}
                <div className="flex-col my-5">
                    <p className="text-20 font-normal text-black">How it works</p>
                    <h1 className="text-55 text-black font-semibold leading-55">Maximize Your Investment</h1>
                    <p className="text-20 font-normal text-greyL">Transform your property into a successful invesment</p>
                </div>

                {/*Steps*/}
                <div className="flex-col pt-5">
                    <div className="flex">
                        <img className="mr-78 bg-Turqoise rounded-full p-2" src={plus} alt="Steps" />
                        <img className="mr-78 bg-white rounded-full p-2" src={bell} alt="Steps" />
                        <img className="mr-78 bg-white rounded-full p-2" src={gear} alt="Steps" />
                    </div>
                    <div className="flex">
                        <div className="flex-col w-4/12">
                            <p className="text-black text-24 mt-5 font-medium w-10/12">List Your Property</p>
                            <p className="text-greyL text-base font-normal w-10/12 leading-4">Easily create a listing that links 
                            your property’s to quality renters.</p>
                        </div>
                        <div className="flex-col w-4/12 pl-5">
                            <p className="text-black text-24 mt-5 font-medium w-10/12">Receive Inquires</p>
                            <p className="text-greyL text-base font-normal w-10/12 leading-4">Get direct inquires from renters interested in your property.</p>
                        </div>
                        <div className="flex-col w-4/12 pl-10">
                            <p className="text-black text-24 mt-5 font-medium w-10/12">Manage Your Rental</p>
                            <p className="text-greyL text-base font-normal w-10/12 leading-4">Organize payments & lease 
                            agreements all in one place.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* section3 */}

        {/* Heading */}
        <section className="relative w-11/12 h-1300 mx-auto my-10 bg-lightblue bg-opacity-50 rounded-3xl font-pop">
            <div className="w-4/5 mx-auto pt-16">
                <div className="flex-col text-center">
                    <p className="text-black font-medium text-base">Why Choose Fortex</p>
                    <h1 className="text-55 leading-55 text-black font-semibold">Our Seamless Solutions</h1>
                    <p className="w-4/12 my-3 mx-auto text-greyL text-base leading-4">Hassle-free, effiicient approach to property management that drives results.</p>
                </div>

                {/* img and text black */}
                <div className="flex justify-between my-10">
                    <div className="flex-col pt-10">
                        <h1 className="text-black text-36 font-medium leading-36 w-3/4">List & Manage All Your 
                        Properties with Ease</h1>
                        <p className="text-24 text-greyL leading-24 my-8 w-10/12">Our user-friendly tools enable you to showcase your rentals, connect with potential tenants, and handle all aspects of property management in one place.</p>
                    </div>
                    <img src={img} alt="img1" className="w-2/5" />
                </div>
                {/* img and text black */}
                <div className="flex justify-between my-10">
                <img src={img} alt="img1" className="w-2/5 mr-10" />
                    <div className="flex-col pt-10">
                        <h1 className="text-black text-36 font-medium leading-36 w-3/4">List & Manage All Your 
                        Properties with Ease</h1>
                        <p className="text-24 text-greyL leading-24 my-8 w-10/12">Our user-friendly tools enable you to showcase your rentals, connect with potential tenants, and handle all aspects of property management in one place.</p>
                    </div>
                </div>

                {/* img and text black */}
                <div className="flex justify-between my-10">
                    <div className="flex-col pt-10">
                        <h1 className="text-black text-36 font-medium leading-36 w-3/4">List & Manage All Your 
                        Properties with Ease</h1>
                        <p className="text-24 text-greyL leading-24 my-8 w-10/12">Our user-friendly tools enable you to showcase your rentals, connect with potential tenants, and handle all aspects of property management in one place.</p>
                    </div>
                    <img src={img} alt="img1" className="w-2/5" />
                </div>
            </div>
        </section>
        <h1 className="w-8/12 mx-auto text-center leading-55 text-black text-55 font-medium font-pop">Renters Start Your Search Today!
            Owners List Your Property Now!</h1>
            <a href="/signup" className="flex w-fit mx-auto my-7 p-3 px-6 pt-2 text-black text-xl font-semibold bg-Turqoise rounded-full">Sign Up Now</a>
        <Footer />
        </>
    )
}

export default Home;