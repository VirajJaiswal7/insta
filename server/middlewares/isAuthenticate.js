import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "token not found login again",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Not a vailid token",
        success: false,
      });
    }

    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(400).json({
        message: "User not exist",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
