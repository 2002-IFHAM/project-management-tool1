const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config({ path: "./config.env" });

// Get the database URI from environment variables
const dbURI = process.env.DB_URI;
console.log("Database URI:", process.env.DB_URI); // Log the URI to ensure it's loaded correctly

mongoose
  .connect(dbURI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));
