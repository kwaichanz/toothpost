import { Router, Request, Response, NextFunction } from "express";

import Post from "../../models/post";

const router = Router();

router.get(
  "/api/post/show/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

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
