import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-shell">
        <Navbar />

        <main className="page-shell">
          <Outlet />
        </main>
      </div>
    </div>
  );
}