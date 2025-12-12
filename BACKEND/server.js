const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config();
const sequelize = require("./config/db")

// Sequelize DB connection import
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes/roleRoutes");
//load Models 
// require("./models/userModel")

const app = express();

app.use(express.json());         // ← IMPORTANT
app.use(express.urlencoded({ extended: true })); // ← OPTIONAL
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"], // Added common Vite ports
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

//  SERVER + DB CONNECT + SYNC RUN
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database conected");
    await sequelize.sync();
    console.log("Model Sync");
    app.listen(process.env.PORT, () => {
      console.log(`Server is Now liosting on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("DB Connectionb Error:", error)

  }
}
startServer();

