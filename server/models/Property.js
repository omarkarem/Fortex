import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true }, 
  size: { type: Number, required: true },
  renter:{type:String, default:""},
  image: { type: String, default: "" },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
})

const Property = mongoose.model("Property", PropertySchema);
export default Property;