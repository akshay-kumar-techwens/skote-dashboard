const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require("cors")
require("dotenv").config();
const sequelize = require("./config/db")

// Sequelize DB connection import
const authRoutes = require("./routes/authRoutes");
//load Models 
require("./models/userModel")

const app = express();

app.use(express.json());         // ← IMPORTANT
app.use(express.urlencoded({ extended: true })); // ← OPTIONAL
app.use(cookieParser());

app.use(cors({
   origin: "http://localhost:3000",
  credentials: true
}))

app.use("/api/auth", authRoutes);

//  SERVER + DB CONNECT + SYNC RUN
const startServer=async()=>{
  try {
    await sequelize.authenticate();
    console.log("Database conected");
    await sequelize.sync();
    console.log("Model Sync");
    app.listen(process.env.PORT,()=>{
      console.log(`Server is Now liosting on port ${process.env.PORT}`);
    });
    
  } catch (error) {
    console.error("DB Connectionb Error:",error)
    
  }
}
startServer();

