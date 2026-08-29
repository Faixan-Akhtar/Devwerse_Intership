require("dotenv").config({ quiet: true, debug: true });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const ConnectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const requestRoute = require("./routes/requestRoute.js");
const donationRoute = require("./routes/donationRoute.js");
const contactRoute = require("./routes/contactRoute.js");
const donorRoutes = require("./routes/donorRoutes");
const bloodRequestRoutes = require("./routes/requestRoute.js");
const donorDashboardRoutes = require("./routes/donorDashboardRoutes");

const Port = process.env.Port;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoute);
app.use("/api/donations", donationRoute);
app.use("/api/contact", contactRoute);
app.use("/api/donors", donorRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api", donorDashboardRoutes);

ConnectDB();

app.listen(Port, () => {
  console.log(`💔LifeLinkServer is running at http://localhost:${Port}`);
});
