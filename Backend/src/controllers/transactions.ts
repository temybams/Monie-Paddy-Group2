import { Request, Response } from "express";
import Transaction from "../models/transactionmodel";
import { airtimeValidation, options } from "../utils/signupValidation";
import User from "../models/userModel";
import Bcrypt from "bcryptjs";

export async function buyAirtime(req: Request, res: Response) {
  const userId = req.user;
  const { error } = airtimeValidation.validate(req.body, options);
  if (error)
    return res.status(400).json({
      message: error.message,
    });

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({
      message: "User not found",
    });
  const { amount, phoneNumber, network, transactionPin } = req.body;
  try {
    console.log(user.transactionPin, transactionPin);
    if (
      user.transactionPin !== transactionPin &&
      !Bcrypt.compareSync(transactionPin, user.transactionPin as string)
    ) {
      return res.status(400).json({
        message: "Invalid transaction pin",
      });
    }
    if (user.balance < amount)
      return res.status(400).json({
        message: "Insufficient balance",
      });

    const transaction = new Transaction({
      amount,
      phoneNumber,
      network,
      userId,
      transactionType: "airtime",
    });
    transaction.save();
    user.balance -= amount;
    user.save();
    res.json({
      message: "successfully purchased airtime",
      data: transaction,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
