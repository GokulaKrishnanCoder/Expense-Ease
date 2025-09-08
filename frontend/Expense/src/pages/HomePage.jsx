import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-bg text-white min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-dark py-2 px-4">
        <h2 className="fw-bold m-0">Expense Ease</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-2">
              <button
                className="btn text-light custom"
                onClick={() => navigate("/login")}
            
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn text-light custom"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
        <h3 className="mb-3 hero-title">
          Simplify Your Finances, One Expense at a Time
        </h3>
        <p className="mb-4 hero-text">
          Take control of your expenses with Expense Ease. Track, manage, and
          analyze your spending effortlessly.
        </p>
        <button
          className="btn btn-outline-light btn-lg"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
