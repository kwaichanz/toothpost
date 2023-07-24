import * as dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  newCommentRouter,
  deleteCommentRouter,
} from "./routers";

const app = express();

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(newPostRouter);
app.use(deletePostRouter);
app.use(updatePostRouter);
app.use(showPostRouter);

app.use(newCommentRouter);
app.use(deleteCommentRouter);

app.all("*", (req, res, next) => {
  const error = new Error("not found!") as CustomError;
  error.status = 404;
  next(error);
});

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "something went wrong" });
  }
);

const start = async () => {
  console.log("Starting up...");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
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
