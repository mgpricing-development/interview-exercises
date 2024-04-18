const { NotFoundError } = require("../../errors");
const Guests = require("../../models/guests.model");

const getGuest = async ({ guestId }) => {
  const guest = await Guests.findOne({ guestId });

  if (!guest) {
    throw new NotFoundError(`Guest not found for guestId: ${guestId}`);
  }

  return guest;
};

module.exports = getGuest;
