const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require("cors")
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());         // ← IMPORTANT
app.use(express.urlencoded({ extended: true })); // ← OPTIONAL
app.use(cookieParser());

app.use(cors({
   origin: "http://localhost:3000",
  credentials: true
}))

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
