import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, postId } = req.params;

    if (!postId || !commentId) {
      const error = new Error(
        "post id and comment id are required"
      ) as CustomError;
      error.status = 400;

      next(error);
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

export { router as deletePostRouter };
