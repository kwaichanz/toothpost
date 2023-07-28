import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, postId } = req.params;

    if (!postId || !commentId) {
      next(new BadRequestError("post id and comment id are required"));
    }

    try {
      await Comment.findOneAndRemove({ _id: commentId });
    } catch (err) {
      next(new Error("comment cannot be deleted!"));
    }

    try {
      await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: commentId } }
      );

      res.status(200).json({ success: true });
    } catch (err) {
      next(new Error("post cannot be updated"));
    }
  }
);

export { router as deleteCommentRouter };
