const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
require('colors')
app.use(cors());
app.use(express.json());


const dburi = `mongodb+srv://${process.env.SUPERSHOP_USERNAME}:${process.env.SUPERSHOP_PASSWORD}@cluster0.lmwybt8.mongodb.net/?retryWrites=true&w=majority`;

const databaseConnect = async () => {
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 30000,
    });

    console.log("Database connection successful".cyan.underline);
  } catch (error) {
    console.log(error.message);
    console.log("Database connection failed");
  }
};
databaseConnect();


// Routes function
const sellSchema = require("./routeHandler/sellProductHandler");

// application routes
app.use("/sellProduct", sellSchema);


app.get("/", (req, res) => {
  res.send("SuperShop. Unlock your code knowledge");
});

app.listen(port, (req, res) => {
  console.log(`SuperShop are running on: ${port}`.blue.bold);
});
