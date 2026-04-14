import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Locks from "./pages/Locks";
import Deadlocks from "./pages/Deadlocks";
import Metrics from "./pages/Metrics";
import Policies from "./pages/Policies";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/locks" element={<Locks />} />
        <Route path="/deadlocks" element={<Deadlocks />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/policies" element={<Policies />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}