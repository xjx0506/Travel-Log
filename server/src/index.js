const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares");
const logs = require("../api/logs");

const app = express();
const port = process.env.PORT || 1337;

//CONNECT TO THE DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json())
app.get("/", (req, res) => {
  res.json({
    message: "Hey there",
  });
});

app.use('/api/logs',logs)

//error handling
app.use(notFound);
//error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server listening");
});
