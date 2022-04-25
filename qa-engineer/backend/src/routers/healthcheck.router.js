const express = require("express");
const { asyncHandler } = require("../middleware");
const router = new express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    return res.status(200).send("OK");
  })
);

module.exports = router;
