import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = Router();

router.post(
  "/api/comment/new/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { userName, content } = req.body;

    if (!content) {
      const error = new Error("content is required") as CustomError;
      error.status = 400;

      return next(error);
    }

    const newComment = new Comment({
      content,
      userName: userName ? userName : "anonymous",
    });

    await newComment.save();

    const updatedPost = Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment } },
      { new: true }
    );

    res.status(200).send(updatedPost);
  }
);

export { router as newCommentRouter };
