const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const healthCheckRoutes = require("./routers/healthcheck.router");
const configRoutes = require("./routers/config.router");
const tasksRoutes = require("./routers/tasks.router");
const { validateRequestStructure, errorHandler } = require("./middleware");
const mongoose = require("mongoose");
const basicAuth = require("express-basic-auth");

const app = express();
app.enable("trust proxy");
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(validateRequestStructure);
app.use("/healthcheck", healthCheckRoutes);
app.use("/config", configRoutes);

if (process.env.BASIC_AUTH_USERNAME) {
  console.log(
    "Basic Auth",
    process.env.BASIC_AUTH_USERNAME,
    process.env.BASIC_AUTH_PASSWORD
  );
  const users = {};
  users[process.env.BASIC_AUTH_USERNAME] = process.env.BASIC_AUTH_PASSWORD;

  app.use(
    basicAuth({
      users
    })
  );
}

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
