import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";
import API from "../api";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* Form Section */}
        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center p-4 bg-dark text-white">
          <div className="w-100" style={{ maxWidth: "350px" }}>
            <h2 className="fw-bold text-center mb-5">Expense Ease</h2>
            <h5 className="fw-semibold text-center mb-3">
              Log in to your account
            </h5>
            <p className="text-center mb-3">
              Don't have an account?{" "}
              <span
                className="fw-semibold text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={handleRegister}
              >
                Sign Up
              </span>
            </p>
            <div className="d-flex justify-content-center mb-5">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  const email = decoded.email;
                  try {
                    const res = await API.post("/auth/googleRegister", {
                      email,
                    });
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    navigate("/dashboard");
                  } catch (err) {
                    alert("Google Registration failed");
                  }
                }}
                onError={() => alert("Google Login Failed")}
              />
            </div>
            <div className="text-center mb-5">Or use email and password</div>
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

              <div className="mb-3">
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
                  className="btn text-light"
                  style={{ backgroundColor: "#393E46" }}
                >
                  Login
                </button>
              </div>
            </form>
            
          </div>
        </div>

        {/* Image Section (Hidden on small screens) */}
        <div className="col-lg-8 d-none d-lg-block">
          <img
            src={bg}
            alt="Login background"
            className="img-fluid w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
