require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(userRouter);

module.exports = app;
