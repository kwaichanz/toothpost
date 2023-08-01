import * as dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";

import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  addImagesRouter,
  deleteImagesRouter,
  newCommentRouter,
  deleteCommentRouter,
  signupRouter,
  signinRouter,
  currentUserRouter,
} from "./routers";
import {
  currentUser,
  errorHandler,
  requireAuth,
  NotFoundError,
} from "../common";
import { signoutRouter } from "./routers/auth/signout";

const app = express();

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.set("trust proxy", true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError());
});

// declare global {
//   interface CustomError extends Error {
//     status?: number;
//   }
// }

app.use(
  errorHandler
  // (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  //   if (error.status) {
  //     return res.status(error.status).json({ message: error.message });
  //   }

  //   return res.status(500).json({ message: "something went wrong" });
  // }
);

const start = async () => {
  console.log("Starting up...");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined!");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required!");
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to connect to MongoDB");
  }

  app.listen(8000, () => console.log("server is running on port 8000"));
};

start();
