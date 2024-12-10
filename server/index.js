import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from '../server/config/db.js';
import authRoutes from "./routes/authRoutes.js";
import Property from "./models/Property.js";
import propertyRoutes from "./routes/PropertiesRoutes.js"
import userRoutes from "./routes/UserRoutes.js"
dotenv.config({
    path:'./config/.env'
});


const PORT = process.env.PORT;
const app = express();


app.use(cors({
    origin: "*", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  
//Middleware
app.use(bodyParser.json());


//Routes
app.use("/auth",authRoutes);

app.use("/properties", propertyRoutes);

app.use("/user", userRoutes); // Add user routes under "/user"


app.listen(PORT, async ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
    await connectDB();
});