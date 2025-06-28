import React from "react";
import exit from "../assets/exit.png";
import boy from "../assets/boy.png";
import woman from "../assets/woman.png";
import "../App.css";

const Settings = () => {
  return (
    <>
      <div className="container">
        <div
          className=" card text-light  p-3 mb-4 d-flex flex-row align-items-center justify-content-between"
          style={{ backgroundColor: "#423F3E" }}
        >
          <span>Change Profile Picture</span><img
            src={boy}
            className="rounded-circle ms-5"
            alt="User"
            width="25"
            height="25"
          />
        </div>
        <div
          className=" card text-light p-3 mb-4"
          style={{ backgroundColor: "#423F3E" }}
        >
          Change Password
        </div>
        <div
          className=" card text-light  p-3 mb-4"
          style={{ backgroundColor: "#423F3E" }}
        >
          Update Email
        </div>
      

        <div className="card text-light bg-danger p-3 mb-4 d-flex flex-row align-items-center justify-content-between">
          <span>Logout</span>
          <img src={exit} className="exitIcon ms-2" alt="exiticon" />
        </div>
      </div>
    </>
  );
};

export default Settings;
