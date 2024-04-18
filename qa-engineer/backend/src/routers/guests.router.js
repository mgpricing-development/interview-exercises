const express = require("express");
const router = new express.Router();
const { asyncHandler } = require("../middleware");
const registerGuest = require("../services/guests/register-guest");
const getGuest = require("../services/guests/get-guest");
const flattenMongooseDocument = require("../utils/flatten-mongoose-document");
const requestContextService = require("../services/request-context.service");

const readGuestHeaders = (req, res, next) => {
  requestContextService.setRequestVariable(
    "guestId",
    req.headers["x-guest-id"]
  );
  next();
};

router.use(readGuestHeaders);

const registerGuestEndpoint = async (req, res) => {
  const { email, reportId } = req.body;

  return res.status(200).send(
    flattenMongooseDocument(
      await registerGuest({
        guestId: requestContextService.getRequestVariable("guestId"),
        email,
        reportId
      })
    )
  );
};

const getGuestEndpoint = async (req, res) => {
  return res.status(200).send(
    flattenMongooseDocument(
      await getGuest({
        guestId: requestContextService.getRequestVariable("guestId")
      })
    )
  );
};

router.post("/", asyncHandler(registerGuestEndpoint));
router.get("/me", asyncHandler(getGuestEndpoint));

module.exports = router;
