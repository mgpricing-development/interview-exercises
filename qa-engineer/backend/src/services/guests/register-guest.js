const { ConflictError } = require("../../errors");
const Guests = require("../../models/guests.model");

const registerGuest = async ({ guestId, email }) => {
  const existingGuest = await Guests.findOne({ guestId });

  if (existingGuest) {
    throw new ConflictError(
      `Guest with the same GuestId already exists: ${guestId}`
    );
  }

  const guest = new Guests({
    guestId,
    email
  });

  return guest.save();
};

module.exports = registerGuest;
