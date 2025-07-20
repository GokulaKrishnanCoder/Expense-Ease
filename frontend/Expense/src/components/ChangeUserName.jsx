import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const ChangeUserName = ({onClose}) => {
  const [userName, setUserName] = useState("");
  
  

 

  const handleSubmit=async()=>{
    try{
        const res = await API.post("/auth/changeUserName",{
            newUserName:userName
        });
        
        console.log(res);
        toast.success("Username changed Successfully");
        const user = JSON.parse(localStorage.getItem("user"));
        user.name = userName;
        localStorage.setItem("user",JSON.stringify(user));
        onClose();
    }catch(err){
        console.log(err.message);
        toast.error("Something went wrong");
        onClose();
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mx-1 bg-light col-10 col-md-6 over">
          <form className="p-1 py-2 p-md-4">
            <label htmlFor="newUser" className="form-label">
              Enter your New Username
            </label>
            <input
              type="text"
              id="newUser"
              className="form-control mb-3"
              name="newUser"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
                Change Username
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserName;
