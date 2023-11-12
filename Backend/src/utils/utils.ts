import { Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/userModel";
import Transaction from "../models/transactionmodel";
import { UserInstance } from "../models/userModel";
import { config } from "dotenv";

config();
const secretKey = process.env.JWT_SECRET as string;
const expiresIn = 3 * 60 * 60;

interface PayLoadReturn {
  id: string;
  iat: number;
  exp: number;
}

export function generateToken(user: UserInstance, res: Response) {
  const token = Jwt.sign({ id: user._id }, secretKey, {
    expiresIn,
  });

  //save token as a cookie
  res.cookie("token", token, {
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

export function verifyToken(token: string) {
  try {
    const decoded = Jwt.verify(token, secretKey) as PayLoadReturn;
    return decoded.id;
  } catch (err) {
    return null;
  }
}
export async function calculateBalance(userId: string) {
  const allTransactions = await Transaction.find({ userId });
  let balance = 0;
  if (allTransactions.length === 0) {
    return balance;
  }

  allTransactions.forEach((entry) => {
    entry.credit ? (balance += entry.amount) : (balance -= entry.amount);
  });

  return balance;
}
