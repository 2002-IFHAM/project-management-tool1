import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectManagement from "./ProjectManagement";

const Profile = () => {
  const navigate = useNavigate();
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
  ];

  useEffect(() => {
    navigate("/profile", { replace: true });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <h3>My Projects</h3>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            {project.name}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
      <ProjectManagement />
    </div>
  );
};

export default Profile;
