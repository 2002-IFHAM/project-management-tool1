import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectDetail from "./components/ProjectDetail";
import Profile from "./components/profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        {/* Set Login as the default page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
