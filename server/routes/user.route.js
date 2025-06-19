import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  followUser,
  getAllUsers,
  getOtherUsers,
  unfollowUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
import { upload } from "../middlewares/multer.js";

export const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/logout", logout)
userRoute.get("/otheruser", isAuthenticate, getOtherUsers);
userRoute.get("/getalluser", isAuthenticate, getAllUsers);
userRoute.get("/follow/:targetUserId", isAuthenticate, followUser);
userRoute.get("/unfollow/:targetUserId", isAuthenticate, unfollowUser);
userRoute.put(
  "/updateprofile",
  upload.single("photo"),
  isAuthenticate,
  updateProfile
);
