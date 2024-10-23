const express = require("express");
const Task = require("../model/taskSchema");
const router = express.Router();




router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').populate('project');
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;