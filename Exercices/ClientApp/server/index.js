require("dotenv").config();
const port = process.env.PORT || 5001;
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post("/api/auth/login", (req, res) => {});
app.post("/api/auth/register", (req, res) => {});

app.listen(port, () =>
  console.log("Express server is running on localhost:5001")
);
