import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../common";

const router = Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new BadRequestError("email and password are required"));

    const user = await User.findOne({ email });

    if (user) return next(new BadRequestError("the email is already exist"));

    const newUser = User.build({ email, password });

    await newUser.save();

    req.session = {
      jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!, {
        expiresIn: "2h",
      }),
    };

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
