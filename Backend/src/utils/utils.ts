import { Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/userModel";
import { UserInstance } from "../models/userModel";

export function generateToken(user: UserInstance, res: Response) {
  const secretKey = process.env.JWT_SECRET as string;
  const expiresIn = 3 * 60 * 60;
  const token = Jwt.sign({ id: user._id }, secretKey, {
    expiresIn,
  });

  //save token as a cookie
  res.cookie("token,", token, {
    httpOnly: true,
    maxAge: expiresIn * 1000,
  });
  res.header("token", token);
  return token;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}


// import jwt from 'jsonwebtoken';
// import { Response } from 'express';

// export const generateToken = (userID: string) => {
//   const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
//     expiresIn: '1d',
//   });
//   return token;
// };

// export const setTokenCookie = (res: Response, token: string) => {
//   res.setHeader(
//     'Set-Cookie',
//     `jwt=${token}; HttpOnly; Max-Age=${1 * 24 * 60 * 60}; Path=/`,
//   );
// };
