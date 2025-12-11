const { Sequelize } = require("sequelize");
const path = require("path");

// Load .env from BACKEND folder
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),  // <-- FIX
  override: true
});

console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_DATABASE:", process.env.PG_DATABASE);
console.log("PG_PORT:", process.env.PG_PORT);

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
})();

module.exports = sequelize;
