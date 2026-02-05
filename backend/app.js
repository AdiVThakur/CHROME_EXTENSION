const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const logRoutes = require("./routes/logRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Replace the old mongoose.connect block with this:
mongoose.connect('mongodb://127.0.0.1:27017/timeTrackerDB')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use("/api/logs", logRoutes);

// Serve the dashboard files
const dashboardPath = path.join(__dirname, "../dashboard");
app.use("/analytics-dashboard", express.static(dashboardPath));

app.listen(3000, () => console.log("Server running on port 3000"));