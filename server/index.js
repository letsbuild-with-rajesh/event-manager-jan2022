const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const events = require("./routes/events");
const locations = require("./routes/locations");
const categories = require("./routes/categories");
const ConnectToMongoServer = require("./config/db");
const dotenv = require('dotenv');

dotenv.config();

ConnectToMongoServer();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/apis/events", events);
app.use("/apis/locations", locations);
app.use("/apis/categories", categories);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});