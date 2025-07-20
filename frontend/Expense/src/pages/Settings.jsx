import React from "react";
import exit from "../assets/exit.png";
import "../App.css";
import { useState, useRef, useEffect } from "react";
import API from "../api";
import ChangePassword from "../components/ChangePassword";
import ChangeUserName from "../components/ChangeUserName";

const CLOUDINARY_BASE =
  "https://api.cloudinary.com/v1_1/ddvcavhob/image/upload";

const Settings = () => {
  const [profilePic, setProfilePic] = useState();
  const [showModal, setShowModal] = useState(false);
  const [userShowModal,setUserShowModal] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.profilePic) {
      setProfilePic(user.profilePic);
    }
  }, []);
  const fileInputRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile");
      formData.append("cloud_name", "ddvcavhob");
      // console.log(formData);

      try {
        const res = await fetch(CLOUDINARY_BASE, {
          method: "POST",
          body: formData,
        });
        
        const data = await res.json();
        console.log(data);
        const url = (await data.secure_url) || data.url;
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          alert("User not found. Please log in again.");
          return;
        }
        const res1 = await API.post("/auth/profile-pic", {
          image: url,
        });
        setProfilePic(url);
        user.profilePic = url;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        alert("Failed to upload profile pic", err.message);
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <div className="container-fluid px-1 py-2">
        <div
          onClick={() => fileInputRef.current.click()}
          className=" card text-light  p-3 mb-2 d-flex flex-row align-items-center justify-content-between"
          style={{ backgroundColor: "#2E2E30", cursor: "pointer" }}
        >
          <span>Change Profile Picture</span>

          <img
            src={profilePic}
            className="rounded-circle ms-5"
            alt="User"
            width="30"
            height="30"
            title="Click to change"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
         <div
          className=" card text-light p-3 mb-2"
          style={{ backgroundColor: "#2E2E30", cursor: "pointer" }}
          onClick={()=> setUserShowModal(true)}
        >
          Change User Name
        </div>
        <div
          className=" card text-light p-3 mb-2"
          style={{ backgroundColor: "#2E2E30", cursor: "pointer" }}
          onClick={()=> setShowModal(true)}
        >
          Change Password
        </div>
        {showModal && (
          <div className=" modal-overlay">
            <div className="modal-content">
              <ChangePassword onClose={()=>setShowModal(false)} />
            </div>
          </div>
        )}
        {userShowModal &&(
          <div className=" modal-overlay">
            <div className="modal-content">
              <ChangeUserName onClose={()=>setUserShowModal(false)} />
            </div>
          </div>
        )}
        

        <div
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
          className="card text-light bg-danger p-3 mb-2 d-flex flex-row align-items-center justify-content-between"
        >
          <span>Logout</span>
          <img src={exit} className="exitIcon ms-2" alt="exiticon" />
        </div>
      </div>
    </>
  );
};

export default Settings;
