import React, { use, useState, useEffect } from "react";
import "../App.css";
import boy from "../assets/boy.png";
import woman from "../assets/woman.png";
import { useLocation } from "react-router-dom";
import RecentExpenses from "../components/RecentExpenses";
import Graph from "../components/Graph";
import Expenses from "../pages/Expenses";
import Settings from "./Settings";
import Summary from "./Summary";
import plus from "../assets/plus.png";
import CreateTransaction from "./CreateTransaction";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const pathToMenu = {
    "/": "Dashboard",
    "/allexpenses": "Expenses",
    "/summary": "Summary",
    "/settings": "Settings",
  };

  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState(pathToMenu[location.pathname]);

  const menuItems = ["Dashboard", "Expenses", "Summary", "Settings"];

  useEffect(() => {
    setActiveItem(pathToMenu[location.pathname]);
  }, [location.pathname]);

  const navigate = useNavigate();

  const nav = (i) => {
    switch (i) {
      case "Expenses":
        navigate("/allexpenses");
        break;
      case "Dashboard":
        navigate("/");
        break;
      case "Summary":
        navigate("/summary");
        break;
      case "Settings":
        navigate("/settings");
        break;
    }
  };

  return (
    <div className="d-flex sidebar-container">
      <div className="sidebar bg-dark text-white p-4">
        <div className="text-center mb-4">
          <img
            src={boy}
            className="rounded-circle"
            alt="User"
            width="60"
            height="60"
          />
          <h5 className="mt-2">User</h5>
          <p className="text-muted small">user@email.com</p>
        </div>

        <ul className="nav flex-column sidebar-nav">
          {menuItems.map((item) => (
            <li
              key={item}
              className={`nav-item${activeItem === item ? " active" : ""}`}
            >
              <a
                className={`nav-link${activeItem === item ? " active" : ""}`}
                onClick={() => {
                  setActiveItem(item);
                  nav(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {(location.pathname === "/" || location.pathname === "/allexpenses") && (
        <button className="floating-button" onClick={() => setShowModal(true)}>
          <img src={plus} alt="Add Transation" className="plus-icon" />
        </button>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateTransaction onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <div className="content p-4 flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Graph/>
                <RecentExpenses />
              </>
            }
          />
          <Route path="/allexpenses" element={<Expenses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
