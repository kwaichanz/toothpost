import { Request, Response, NextFunction } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) return next(new Error("not autherized"))

    next()
}