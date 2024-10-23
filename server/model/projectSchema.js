const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  deadline: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model("Project", projectSchema);