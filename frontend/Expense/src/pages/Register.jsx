import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import bg from "../assets/bg.jpg";
import API from "../api";
import Login from "./Login";
import "../App.css";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { email, password });
      if (res.status === 201) {
        localStorage.setItem("registered", "true");
      }

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Registration failed",
        {
          position: "top-left",
          autoClose: 3000,
        }
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Left Column */}
        <div className="col-lg-8  d-none d-lg-flex ">
          <img
            src={bg}
            alt="ExpenseEase"
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Right Column */}
        <div className="col-lg-4 d-flex flex-column justify-content-center p-3 p-lg-4 bg-dark">
          <div className="mb-4">
            <h2 className="text-light fw-bold mb-5">Expense Ease</h2>
            <h5 className=" text-light fw-semi-bold"> Create a new account</h5>
          </div>

          <form className="mx-3" onSubmit={handleRegister}>
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
                  
                  type="password"
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

            <button
              type="submit"
              className="btn text-light w-100"
              style={{ backgroundColor: "#393E46" }}
            >
              Register
            </button>
          </form>
          <p className="text-light mt-3">
            Already a user?{" "}
            <span
              className="text-light fw-semibold"
              onClick={handleLogin}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          </p>
          <div className="d-flex justify-content-center   mt-5">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                const email = decoded.email;
                try {
                  const res = await API.post("/api/auth/googleRegister", {
                    email,
                  });
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.user));
                  navigate("/dashboard");
                } catch (err) {
                  alert("Google Registration failed");
                  console.log(err.message);
                }
              }}
              onError={() => {
                alert("Google Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
