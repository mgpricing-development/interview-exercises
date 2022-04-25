const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const healthCheckRoutes = require("./routers/healthcheck.router");
const tasksRoutes = require("./routers/tasks.router");
const { validateRequestStructure, errorHandler } = require("./middleware");
const mongoose = require("mongoose");

const app = express();
app.enable("trust proxy");
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(validateRequestStructure);
app.use("/healthcheck", healthCheckRoutes);
app.use("/tasks", tasksRoutes);
app.use(errorHandler);

mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb://localhost:27017/task?readPreference=primary&ssl=false"
  )
  .then(() => console.log("Connected"))
  .catch(() => process.exit(1));

module.exports = app;
