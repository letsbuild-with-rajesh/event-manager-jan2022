const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const events = require("./routes/events");
const locations = require("./routes/locations");
const categories = require("./routes/categories");
const authDetails = require("./routes/authDetails");
const userDetails = require("./routes/userDetails");
const ConnectToMongoServer = require("./config/db");
const dotenv = require('dotenv');

dotenv.config();

ConnectToMongoServer();

const app = express();

const PORT = process.env.PORT;
const CLIENT_DIR = __dirname + "/../client/";

app.use(express.static(path.join(CLIENT_DIR, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'build', 'index.html'))
})

app.use(bodyParser.json());
app.use("/auth", auth);
app.use("/apis/getAuthDetails", authDetails);
app.use("/apis/getUserDetails", userDetails);
app.use("/apis/events", events);
app.use("/apis/locations", locations);
app.use("/apis/categories", categories);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
