const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
