import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import "../App.css";

const ChangePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const res = await API.post("/auth/changePassword", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      onClose();
    } catch (err) {
      console.log(err.message);
      toast.error("Incorrect password");
      onClose();
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="mx-1 bg-light col-10 col-md-6 over">
            <form className="p-1 py-2 p-md-4">
              <label htmlFor="currentpass" className="form-label">
                Enter your Current Password
              </label>
              <input
                type="text"
                id="currentpass"
                className="form-control mb-3"
                name="currentpass"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <label htmlFor="newpass" className="form-label">
                Enter your New Password
              </label>
              <input
                type="text"
                id="newpass"
                className="form-control mb-3"
                name="newpass"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="d-flex justify-content-between gap-2 mt-3">
                <div
                  className="btn btn-dark text-light d-flex  justify-content-center align-items-center"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </div>
                <div
                  className=" btn btn-dark text-light d-flex  justify-content-center align-items-center"
                  onClick={handleSubmit}
                >
                  Change Password
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
