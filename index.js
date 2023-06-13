const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConnectionPath = process.env.DB_CONNECTION_URL;
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbConnectionPath);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToMongoDB();

app.use("/", routes);

app.listen(3001, () => {
  console.log("server is running on port number 3001");
});
