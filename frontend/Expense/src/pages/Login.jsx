import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Mosaic } from "react-loading-indicators";
import bg from "../assets/bg.jpg";

import API from "../api";
import "../App.css"; // Ensure you have this CSS file for hover effects

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    if (localStorage.getItem("registered") === "true") {
      toast.success("Registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("registered");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      // Use toast for a better user experience than alert
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      // Assuming your backend handles both Google login and registration with this endpoint
      const res = await API.post("/auth/googleRegister", { email });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <Mosaic color="#6c757d" size="medium" text="Loading..." textColor="" />
      </div>
    );
  }

  return (
    // Main container with the background image for all screen sizes
    <div
      className="container-fluid g-0 d-flex align-items-center justify-content-center min-vh-100 p-3 p-md-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Form card - responsive and centered */}
      <div
        className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 p-4 p-sm-5 text-white"
        style={{
          background: "rgba(10, 10, 10, 0.75)", // Semi-transparent background
          borderRadius: "1rem",
          backdropFilter: "blur(5px)", // Frosted glass effect for a modern look
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="w-100">
          <h2 className="fw-bold text-center mb-4">Expense Ease</h2>
          <h5 className="fw-semibold text-center mb-3">
            Log in to your account
          </h5>
          <p className="text-center text-white-50 mb-4">
            Don't have an account?{" "}
            <span
              className="fw-semibold text-decoration-underline text-white"
              style={{ cursor: "pointer" }}
              onClick={handleRegister}
            >
              Sign Up
            </span>
          </p>
          <div className="d-flex justify-content-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline" // Using outline theme to better fit the dark background
            />
          </div>
          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" />
            <span className="px-3 text-white-50">OR</span>
            <hr className="flex-grow-1" />
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn login-button text-light fw-bold" // Added 'login-button' class
                style={{ backgroundColor: "#393E46" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;