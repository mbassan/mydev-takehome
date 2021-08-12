const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(
  cors({
    origin: RegExp(
      `^(https?:(?:.+.)?${
        process.env.ORIGIN_DOMAIN_NAME || "localhost"
      }(?::[0-9]{1,5})?)$`
    ),
  })
);
app.use(router);

module.exports = app;
