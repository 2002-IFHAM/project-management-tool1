import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/project')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const createProject = () => {
    axios.post('http://localhost:3001/project', { name: newProjectName })
      .then(response => setProjects([...projects, response.data]))
      .catch(error => console.error('Error creating project:', error));
  };

  const addTask = (projectId) => {
    axios.post(`http://localhost:3001/project/${projectId}/tasks`, { name: newTaskName, deadline: newTaskDeadline })
      .then(response => {
        const updatedProjects = projects.map(project => {
          if (project.id === projectId) {
            return { ...project, tasks: [...project.tasks, response.data] };
          }
          return project;
        });
        setProjects(updatedProjects);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const toggleTaskCompletion = (projectId, taskId, completed) => {
    axios.put(`http://localhost:3001/project/${projectId}/tasks/${taskId}`, { completed })
      .then(response => {
        const updatedProjects = projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: project.tasks.map(task => task.id === taskId ? response.data : task)
            };
          }
          return project;
        });
        setProjects(updatedProjects);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h2>Project Management</h2>
      <input
        type="text"
        placeholder="New Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={createProject}>Create Project</button>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <input
              type="text"
              placeholder="New Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
              type="date"
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
            />
            <button onClick={() => addTask(project.id)}>Add Task</button>
            <ul>
              {project.tasks.map(task => (
                <li key={task.id}>
                  <span>{task.name} (Deadline: {task.deadline})</span>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => toggleTaskCompletion(project.id, task.id, e.target.checked)}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;