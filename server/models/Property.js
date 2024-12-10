import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true }, 
  size: { type: Number, required: true },
  image: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References the user
})

const Property = mongoose.model("Property", PropertySchema);
export default Property;