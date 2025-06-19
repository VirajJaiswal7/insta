import express from "express";
import {
  addPost,
  dislikePost,
  getMyPost,
  getOtherPost,
  likePost,
  savePost,
} from "../controllers/post.controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
import { upload } from "../middlewares/multer.js";

export const postRoute = express.Router();

postRoute.post("/addpost", upload.single("file"), isAuthenticate, addPost);
postRoute.get("/getmypost/:userId", isAuthenticate, getMyPost);
postRoute.get("/getotherpost", isAuthenticate, getOtherPost);
postRoute.get("/likepost/:postId", isAuthenticate, likePost);
postRoute.get("/dislikepost/:postId", isAuthenticate, dislikePost);
postRoute.get("/savepost/:postId", isAuthenticate, savePost);
postRoute.get("/unsavepost/:postId", isAuthenticate, savePost);
