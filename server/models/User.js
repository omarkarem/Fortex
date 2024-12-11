import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    FirstName:{type: String,required:true},
    LastName:{ type: String,required:true},
    Email:{ type: String, required: true , unique: true},
    Password: {type: String, required: true },
    Type: {type: String, required: true },
    PhoneNumber: { type: String }, // Optional phone number field
    bookings: [
      {
        propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
        amount: Number,
        date: Date,
      },
    ],
})

const User = mongoose.model('User', UserSchema);

export default User;

