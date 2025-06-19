import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./database/db.js";
import { userRoute } from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(
  cors({
    origin: "https://insta-5nnw.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// write routes

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
