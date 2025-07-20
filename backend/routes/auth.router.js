import express from "express";
import authController from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";
import User from "../models/User.model.js";


const authrouter = express.Router();

authrouter.post("/register", authController.register);
authrouter.post("/login", authController.login);
authrouter.post("/googleRegister", authController.googleRegister);
authrouter.post("/changeUserName",auth,authController.changeUserName);
authrouter.post("/profile-pic",auth,authController.profilePic);
authrouter.post("/changePassword",auth,authController.changePassword);
export default authrouter;
