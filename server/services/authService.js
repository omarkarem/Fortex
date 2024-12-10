import { User } from "../models/DBSchema";
import bcrypt from "bcrypt";

export const ReqisterUser = async (userData)=>{
    try {
        const existingUser = await User.findOne({Email:userData.Email});
        if(existingUser){
            throw new Error("User already exists")
        }
        const hashedPassword = await bcrypt.hash(userData.Password,10);

        const newUser = new User({
            FirstName:userData.FirstName,
            LastName: userData.LastName,
            Email:userData.Email,
            Password:hashedPassword,
            Type:userData.Type,
        });

        const savedUser = await newUser.save();
        return savedUser;

    } catch (error) {
        throw new Error(error.message)
    }
}