import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
