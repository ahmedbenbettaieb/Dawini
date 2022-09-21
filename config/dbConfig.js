const mongoose = require("mongoose");
//connect to the mongo db

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmed:ccF08sj35DfaLkPC@cluster0.kggmz.mongodb.net/my-project?retryWrites=true&w=majority"
    );
    console.log("MongoDb is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
