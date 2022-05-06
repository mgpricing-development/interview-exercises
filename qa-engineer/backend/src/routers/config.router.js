const express = require("express");
const { asyncHandler } = require("../middleware");
const router = new express.Router();

const getConfigEndpoint = async (req, res) => {
  const basicAuthUsername = process.env.BASIC_AUTH_USERNAME;
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;
  const basicAuthentication = new Buffer(basicAuthUsername + ":" + basicAuthPassword).toString("base64");

  return res.status(200).send({ basicAuthentication });
};



router.get("/", asyncHandler(getConfigEndpoint));

module.exports = router;
