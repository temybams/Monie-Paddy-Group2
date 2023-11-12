import { Request, Response } from "express";
import Transaction from "../models/transactionmodel";
import { airtimeValidation, options } from "../utils/signupValidation";
import User from "../models/userModel";
import Bcrypt from "bcryptjs";
import { calculateBalance } from "../utils/utils";
import { buyAirtimeFromBloc } from "../utils/bloc";

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
  const amountInKobo = amount * 100;
  try {
    const userBalance = await calculateBalance(userId);
    user.balance = userBalance;
    await user.save();
    if (
      user.transactionPin !== transactionPin &&
      !Bcrypt.compareSync(transactionPin, user.transactionPin as string)
    ) {
      return res.status(400).json({
        message: "Invalid transaction pin",
      });
    }
    if (user.balance < amountInKobo)
      return res.status(400).json({
        message: "Insufficient balance",
      });

    //call the airtime api (blochq)
    const response = await buyAirtimeFromBloc(
      amountInKobo,
      phoneNumber,
      network
    );

    if (!response.success) {
      return res.status(400).json(response);
    }

    const { status, reference } = response.data;

    const transaction = new Transaction({
      amount: amountInKobo,
      phoneNumber,
      network,
      userId,
      transactionType: "airtime",
      credit: false,
      reference,
      status,
    });
    await transaction.save();
    if (status !== "successful") {
      return res.status(400).json({
        message: "Airtime purchase successful",
        data: transaction,
      });
    }

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
