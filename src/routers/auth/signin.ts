import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { authenticationService, BadRequestError } from "../../../common";
import * as jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new BadRequestError("email and password are required"))

    const user = await User.findOne({ email });
    if (!user) return next(new BadRequestError("wrong credentials"));

    const isEqual = await authenticationService.pwdCompare(
      user.password,
      password
    );
    if (!isEqual) return next(new BadRequestError("wrong credentials"));

    const token = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '2h'});

    req.session = { jwt: token };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
