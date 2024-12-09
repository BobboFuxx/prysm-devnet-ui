import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IbcTransfer from "./pages/IbcTransfer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ibc-transfer" element={<IbcTransfer />} />
      </Routes>
    </Router>
  );
}

export default App;
