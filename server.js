const express = require("express");
const cors = require("cors");

const adminRoutes = require("./src/routes/admin.routes");
const appRoutes = require("./src/routes/app.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/app", appRoutes);

// Server
app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});