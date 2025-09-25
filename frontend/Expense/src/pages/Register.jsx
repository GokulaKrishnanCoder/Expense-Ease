import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";
import API from "../api";
import "../App.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/register", { email, password });
      if (res.status === 201) {
        localStorage.setItem("registered", "true");
        toast.success("Registered successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Registration failed",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      const res = await API.post("/auth/googleRegister", { email });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google registration failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid g-0 d-flex align-items-center justify-content-center min-vh-100 p-3 p-md-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 p-4 p-sm-5 text-white"
        style={{
          background: "rgba(10, 10, 10, 0.75)",
          borderRadius: "1rem",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="w-100">
          <h2 className="fw-bold text-center mb-4">Expense Ease</h2>
          <h5 className="fw-semibold text-center mb-3">
            Create a new account
          </h5>
          <p className="text-center text-white-50 mb-4">
            Already a user?{" "}
            <span
              className="fw-semibold text-decoration-underline text-white"
              style={{ cursor: "pointer" }}
              onClick={handleLogin}
            >
              Login
            </span>
          </p>
          <div className="d-flex justify-content-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
            />
          </div>
          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" />
            <span className="px-3 text-white-50">OR</span>
            <hr className="flex-grow-1" />
          </div>
          <form onSubmit={handleRegister}>
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
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </span>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn login-button text-light fw-bold"
                style={{ backgroundColor: "#393E46" }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;