import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/utils";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("token") || req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unathorized",
      error: "No token provided",
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({});
  }
}
