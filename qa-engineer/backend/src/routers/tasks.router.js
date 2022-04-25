const express = require("express");
const { asyncHandler } = require("../middleware");
const router = new express.Router();
const Tasks = require("../models/tasks.model");

const getTasksEndpoint = async (req, res) => {
  const tasks = await Tasks.find({});

  return res.status(200).send(tasks.map((task) => task.toJSON()));
};

const deleteTaskEndpoint = async (req, res) => {
  const { taskId } = req.pathParams;
  const task = await Tasks.findOne({ taskId });

  await task.delete();
  return res.status(204);
};

const createTaskEndpoint = async (req, res) => {
  const task = new Tasks(req.body);

  await task.save();
  return res.status(200).send(task.toJSON());
};

router.get("/", asyncHandler(getTasksEndpoint));
router.post("/", asyncHandler(createTaskEndpoint));
router.delete("/:taskId", asyncHandler(deleteTaskEndpoint));

module.exports = router;
