const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors()); // Enable CORS for all routes

// Load environment variables from .env file
dotenv.config({ path: "./config.env" });

// Middleware
app.use(express.json());

// Database connection
require("./db/connect");

// Models
const User = require("./model/userSchema");
const Project = require("./model/projectSchema");
const Task = require("./model/taskSchema");

// Routes
// app.use(require('./router/auth'));
// // app.use(require('./router/projectRoutes'));
// // app.use(require('./router/taskRoutes'));
// try {
//   app.use(require('./router/projectRoutes'));
// } catch (error) {
//   console.error("Error loading projectRoutes:", error);
// }

// try {
//   app.use(require('./router/taskRoutes'));
// } catch (error) {
//   console.error("Error loading taskRoutes:", error);
// }

const authRouter = require("./router/auth");
app.use("/auth", authRouter);

const projectRouter = require("./router/projectRoutes");
app.use("/project", projectRouter);

const taskRouter = require("./router/taskRoutes");
app.use("/task", taskRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port no. ${3001}`);
});
