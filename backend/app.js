const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("We are connected 🔌"))
  .catch(() => console.log("Couldn't connect to the db 🥸"))

app.use(express.json())
app.use(cors());

app.use("/api/auth", require('./routes/auth'));


const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running...");
})