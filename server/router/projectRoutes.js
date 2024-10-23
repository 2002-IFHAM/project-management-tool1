const express = require("express");
const Project = require("../model/projectSchema");
const router = express.Router();

let projects = [];

router.post("/project", (req, res) => {
  const { name, tasks } = req.body;
  const newProject = { id: projects.length + 1, name, tasks: tasks || [] };
  projects.push(newProject);
  res.status(201).json(newProject);
});

router.get("/project", (req, res) => {
  res.json(projects);
});

router.post("/project/:projectId/tasks", (req, res) => {
  const { projectId } = req.params;
  const { name, deadline } = req.body;
  const project = projects.find((p) => p.id == projectId);
  if (project) {
    const newTask = {
      id: project.tasks.length + 1,
      name,
      deadline,
      completed: false,
    };
    project.tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

router.put("/project/:projectId/tasks/:taskId", (req, res) => {
  const { projectId, taskId } = req.params;
  const { completed } = req.body;
  const project = projects.find((p) => p.id == projectId);
  if (project) {
    const task = project.tasks.find((t) => t.id == taskId);
    if (task) {
      task.completed = completed;
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// router.post("/projects", async (req, res) => {
//   try {
//     const project = new Project(req.body);
//     await project.save();
//     res.status(201).send(project);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/projects", async (req, res) => {
//   try {
//     const projects = await Project.find().populate('tasks');
//     res.status(200).send(projects);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/projects/:id", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id).populate('tasks');
//     if (!project) {
//       return res.status(404).send();
//     }
//     res.status(200).send(project);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
