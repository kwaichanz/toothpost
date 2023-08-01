import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post(
  "/post/delete/images",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imagesIds } = req.body;

    const post = Post.findOneAndUpdate(
      { _id: id },
      { $pull: { images: { _id: { $in: imagesIds } } } }
    );

    res.status(200).send(post);
  }
);

export { router as deleteImagesRouter };