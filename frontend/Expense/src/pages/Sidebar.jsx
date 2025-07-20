import React, { use, useState, useEffect } from "react";
import "../App.css";

import { useLocation } from "react-router-dom";
import RecentExpenses from "../components/RecentExpenses";
import Graph from "../components/Graph";
import Expenses from "../pages/Expenses";

import ThisMonth from "../components/ThisMonth";
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
    "/dashboard": "Dashboard",
    "/allexpenses": "Expenses",
    "/summary": "Summary",
    "/settings": "Settings",
  };

  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState(pathToMenu[location.pathname]);
  const [userName,setUserName] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(user?.profilePic || "https://res.cloudinary.com/ddvcavhob/image/upload/v1751982033/boy_nhzrc3.png");

  const menuItems = ["Dashboard", "Expenses", "Summary", "Settings"];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveItem(pathToMenu[location.pathname]);
  }, [location.pathname]);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setProfile(updatedUser?.profilePic);
      setUserName(updatedUser?.name);
    }, 500); // check every 0.5s
    return () => clearInterval(interval);
  }, []);

  const nav = (i) => {
    switch (i) {
      case "Expenses":
        navigate("/allexpenses");
        break;
      case "Dashboard":
        navigate("/dashboard");
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
    <>
      {/* for mobile */}
      {/* Bottom navigation bar for mobile */}
      <div
        className="mobile-downbar d-md-none d-flex justify-content-around align-items-center bg-dark text-white py-1"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
          borderTop: "1px solid #222",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => nav("Dashboard")}>
          <i className="bi bi-house" style={{ fontSize: 22 }}></i>
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => nav("Expenses")}>
          <i className="bi bi-list" style={{ fontSize: 22 }}></i>
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg" style={{ fontSize: 22 }}></i>
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => nav("Summary")}>
          <i className="bi bi-bar-chart" style={{ fontSize: 22 }}></i>
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => nav("Settings")}>
          <img
            src={profile}
            className="rounded-circle"
            alt="User"
            width="28"
            height="28"
            style={{ objectFit: "cover", border: "2px solid #fff" }}
          />
        </span>
      </div>
      <div
        className="mobile-upbar d-md-none d-flex  align-items-left bg-dark text-white p-2"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2000,
          borderBottom: "1px solid #222",
        }}
      >
        Expense Ease
      </div>
      {/* for desktop */}
      <div className="d-flex sidebar-container">
        <div className="sidebar bg-dark text-white d-md-flex flex-column d-none d-md-block p-4">
          <div className="text-center mb-4">
            <img
              src={profile}
              className="rounded-circle"
              alt="User"
              width="60"
              height="60"
            />
            <h5 className="mt-2">{userName}</h5>
            
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
          <div className="text-center fw-semibold mt-auto ">{user.email}</div>
        </div>
        

        {(location.pathname === "/dashboard" ||
          location.pathname === "/allexpenses") &&
          !isMobile && (
            <button
              className="floating-button"
              onClick={() => setShowModal(true)}
            >
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

        <div
          className={`content p-md-2  sm-p-0 flex-grow-1 ${
            isMobile ? "mobile-top-spacing" : ""
          }`}
        >
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <Graph />
                  <div className="row g-3 ">
                    <div className="col-12 col-md-8 d-flex">
                      <RecentExpenses />
                    </div>
                    <div className=" col-12 col-md-4 d-flex">
                      <ThisMonth />
                    </div>
                  </div>
                </>
              }
            />

            <Route path="/allexpenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
