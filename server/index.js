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

app.use(cors());

// app.use(cors({
//     origin: "*", // Frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }));
  
//Middleware
app.use(bodyParser.json());


//Routes

app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
  });
  
app.use("/auth",authRoutes);

app.use("/properties", propertyRoutes);

app.use("/user", userRoutes); // Add user routes under "/user"


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

export default app;