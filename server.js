const express = require("express");
const connectDb = require("./config/dbConfig");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const morgan = require("morgan");


connectDb();

app.use(express.json());
app.use(morgan("dev"));
const userRoute = require("./routes/userRoute");
const adminRoute=require("./routes/adminRoute");

app.use("/api/users", userRoute);
app.use("/api/admin",adminRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`node server started at ${port}`));
