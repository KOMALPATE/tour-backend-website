const express = require("express");
const cors = require("cors");
const db = require("./db");

const adminRoutes =require("./src/routes/admin.routes")
const  appRoutes = require("./src/routes/app.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/app', appRoutes);

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});