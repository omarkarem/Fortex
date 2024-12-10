import React, { useState } from "react";
import LogoB from "../assets/blackLogo.svg";
import Log from "../assets/ForwardButton.svg";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // to clear errors
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    //handle forom submission
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("https://fortexserver.vercel.app/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({Email:email,Password:password}),
                mode: "cors", // Explicitly enable CORS
            });
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("token",data.token);
                const decodedToken = JSON.parse(atob(data.token.split(".")[1])); // Decode JWT
                const userType = decodedToken.type; // Extract user type from token
        
                if (userType === "Owner") {
                  navigate("/dashboard");
                } else if (userType === "Renter") {
                  navigate("/properties");
                } else {
                  setError("Invalid user type");
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occured. ttry again");
        } finally {
            setLoading(false);
        }
    };


    return(
        <section className="w-screen h-screen bg-lightblue flex flex-col items-center justify-center font-pop">
            <img src={LogoB} alt="Fortex Logo Black" />
            <p className="text-center text-black font-medium text-24 leading-24 my-12">Login to Your Account</p>
            <form onSubmit={handleSubmit} className="w-2/6 space-y-4">
             {/* email */}
            <div className="flex flex-col w-full space-y-2">
                <label className="text-13 text-greyL">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name="LastName" placeholder="Enter Your Email" type="email" value={email} className="bg-superLgrey h-12 rounded-xl px-5"/>
            </div>
            <div className="flex flex-col w-full space-y-2">
                <label className="text-13 text-greyL">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} name="FirstName" placeholder="Enter your Password" type="password" value={password} className="bg-superLgrey h-12 rounded-xl px-5"/>
            </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <button type="submit" className="bg-black text-white w-full h-12 rounded-full mt-5"disabled={loading}>{loading ? "Logging in..." : "Get Access Now"}</button>
            </div>
            </form>
            <div className="text-greyL text-base flex items-center justify-end my-4">
                <p className="mr-1">Don’t have an account?</p>
                <a id="Login" href="/signup" className="text-black font-medium flex items-center">
                Sign Up 
                <img src={Log} alt="Login" className="ml-1" />
                </a>
            </div>

        </section>
    )
}

export default Login;