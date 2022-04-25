const express = require("express");
const { asyncHandler } = require("../middleware");
const router = new express.Router();
const Tasks = require("../models/tasks.model");

const taskObject = (task) => {
  const object = task.toJSON();

  return {
    ...object,
    _id: task._id.toString()
  };
};

const getTasksEndpoint = async (req, res) => {
  const tasks = await Tasks.find({});

  return res.status(200).send(tasks.map((task) => taskObject(task)));
};

const deleteTaskEndpoint = async (req, res) => {
  const { taskId } = req.params;

  await Tasks.deleteOne({ taskId });
  return res.status(204).send();
};

const createTaskEndpoint = async (req, res) => {
  const task = new Tasks(req.body);

  await task.save();
  return res.status(200).send(taskObject(task));
};

router.get("/", asyncHandler(getTasksEndpoint));
router.post("/", asyncHandler(createTaskEndpoint));
router.delete("/:taskId", asyncHandler(deleteTaskEndpoint));

module.exports = router;
