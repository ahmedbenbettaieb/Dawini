const express = require("express");
require("dotenv").config();

const app = express();


const userRoute = require("./routes/userRoute");
app.use(express.json());

const dbConfig = require("./config/dbConfig");

app.use('/api/users', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`node server started at ${port}`));
