const mongoose=require('mongoose');


//connect to the mongo db
const connect =mongoose.connect(process.env.MONGO_URL);

//create object to this connection
const connection=mongoose.connection;
//testing connection 
//if succeeded
connection.on('connected',()=>{
    console.log('MongoDb is connected');
})
//if failed
connection.on('error',(err)=>{
    console.log('connection error',err);
})
module.exports=mongoose;
