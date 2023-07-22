import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post(
  "/api/post/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
      const error = new Error("title and content are required") as CustomError;
      error.status = 400;

      return next(error);
    }
  }
);

export { router as newPostRouter };
