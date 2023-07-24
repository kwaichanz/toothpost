import { Router, Request, Response, NextFunction } from "express";

import Post from "../../models/post";

const router = Router();

router.post(
  "/api/post/show",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (!id) {
      const allPost = await Post.find();
      return res.status(200).send(allPost);
    }

    try {
      const post = await Post.findOne({ _id: id });

      return res.status(200).send(post);
    } catch (err) {
      next(new Error("cannot find the post"));
    }
  }
);
