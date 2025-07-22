import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";
import API from "../api";
import "../App.css";
import Sidebar from "./Sidebar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <>
      <div className="container-fluid  p-0">
        <div className="row g-0" style={{ minHeight: "100vh" }}>
          {/* Left Column */}
          <div className="col-lg-4 col-sm-2 d-flex flex-column justify-content-center p-3 p-lg-4 bg-dark">
            <h2 className="text-light text-center fw-bold  mt-0 mb-5">Expense Ease</h2>
            <h4 className=" text-light fw-bold">Log in to your account</h4>
            <p className="text-light">
              Don't have an account?{" "}
              <span
                className="text-light fw-semibold"
                onClick={handleRegister}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>

            <div className="d-flex justify-content-center mt-4 mb-3">
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
                onError={() => {
                  alert("Google Login Failed");
                }}
              />
            </div>

            <div className="text-light mb-3 mt-5">
              Or with email and password
            </div>

            <form className="mx-3 mx-sm-3"onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn text-light w-100"
                style={{ backgroundColor: "#393E46" }}
              >
                Login
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="col-lg-8 d-none d-lg-flex ">
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
        </div>
      </div>
    </>
  );
};

export default Login;
