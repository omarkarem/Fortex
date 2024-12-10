import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    FirstName:{type: String,required:true},
    LastName:{ type: String,required:true},
    Email:{ type: String, required: true , unique: true},
    Password: {type: String, required: true },
    Type: {type: String, required: true },
    PhoneNumber: { type: String }, // Optional phone number field
})

const User = mongoose.model('User', UserSchema);

export default User;

