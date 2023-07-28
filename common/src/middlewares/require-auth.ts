import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) return next(new UnauthorizedError())

    next()
}