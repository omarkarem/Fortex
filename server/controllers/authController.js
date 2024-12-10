import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Secret key
const secretKey = process.env.JWT_SECRET || "Secret_key";


// Registration
export const register = async (req, res) => {
    const errors = validationResult(req); // Check validation errors
    if (!errors.isEmpty()) {
      // Return validation errors to the frontend
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { FirstName, LastName, Email, Password, Type } = req.body;
    try {
      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: "Email already in use", param: "Email" }] });
      }
  
      const hashedPassword = await bcrypt.hash(Password, 10);
      const newUser = new User({
        FirstName,
        LastName,
        Email,
        Password: hashedPassword,
        Type,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
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