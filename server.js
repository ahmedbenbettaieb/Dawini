const express=require('express');
require("dotenv").config();

const app=express();


app.use(express.json());
const userRoute=require("./routes/userRoute");

const dbConfig=require("./config/dbConfig");

app.use('api/user',userRoute);

const port=process.env.PORT||5000;

app.listen(port,()=>console.log(`node server started at ${port}`));
