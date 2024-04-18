const mongoose = require("mongoose");

const guestsSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
      immutable: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "guests"
  }
);

const Guests = mongoose.model("Guests", guestsSchema);

module.exports = Guests;
