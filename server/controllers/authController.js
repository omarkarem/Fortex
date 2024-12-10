import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Secret key
const secretKey = process.env.JWT_SECRET || "Secret_key";


//Registration
export const register = async (req,res) =>{
    console.log("Register endpoint hit with data:", req.body); // Debugging log
    const {FirstName, LastName, Email, Password, Type} = req.body;
    try {
        const existingUser = await User.findOne({Email});
        if(existingUser){
            return res.status(400).json({message:"email already in use"});
        }
        const hashedPassword = await bcrypt.hash(Password,10);
        const newUser = new User({
            Email,
            FirstName,
            LastName,
            Email, Password:hashedPassword,
            Type,
        });
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({message:"error registering user",error});
    }
};

//Loogin
export const login = async (req,res) =>{
    const {Email,Password} = req.body;
    try {
        const user = await User.findOne({Email});
        if (!user){
            return res.status(401).json({message:"user not found"});
        }
        const correctPassword = await bcrypt.compare(Password,user.Password);
        if(!correctPassword){
            return res.status(401).json({message:"invalid credetials"});
        }
        const token = jwt.sign({email:user.Email,userId:user._id, type: user.Type},secretKey,{
            expiresIn:"1h",
        });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({message:"error logging in",error});
    }
};


//validate token
export const validateToken = (req,res)=>{
    res.json({isAuthenticated:true, email:req.user.email});
};