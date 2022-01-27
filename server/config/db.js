const mongoose = require("mongoose");
const DBURI = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";

const ConnectToMongoServer = async () => {
  try {
    await mongoose.connect(DBURI, {
      useNewUrlParser: true
    });
    console.log("Connected to Mongo DB!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = ConnectToMongoServer;
