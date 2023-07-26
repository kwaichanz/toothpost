import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";

const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("email and password are required") as CustomError;
      error.status = 400;

      next(error);
    }

    const user = await User.findOne({ email });
    if (!user) return next(new Error("wrong credentials"));
    
  }
);

export { router as signinRouter };
