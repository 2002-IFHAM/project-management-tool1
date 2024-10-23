import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const tasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
  ];

  return (
    <div>
      <h2>Project {id} Details</h2>
      <h3>Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetail;
