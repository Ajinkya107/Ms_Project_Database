import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/home'
import AddProject from './pages/AddProject'
import Reports from './pages/Reports'
import Projects from './pages/Projects'
import AddProjectMilestone from './pages/AddProjectMilestone'
import AssignRole from './pages/AssignRole'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Reports />} />
      <Route path="/AddProject" element={<AddProject />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/AddProjectMilestone" element={<AddProjectMilestone />} />
      <Route path="/AssignRole" element={<AssignRole />} />
    </Routes>
  );
}

export default App;
