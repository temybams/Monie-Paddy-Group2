import { Request, Response } from "express";
import { config } from "dotenv";
import Transaction from "../models/transactionmodel";
import {
  airtimeValidation,
  options,
  validBankTransfer,
} from "../utils/signupValidation";
import User from "../models/userModel";
import Bcrypt from "bcryptjs";
import axios from "axios";
import { calculateBalance } from "../utils/utils";
import { buyAirtimeFromBloc } from "../utils/bloc";

const ps_secret = process.env.PAYSTACK_SECRET;
config();
export async function buyAirtime(req: Request, res: Response) {
  const userId = req.user;
  const { error } = airtimeValidation.validate(req.body, options);
  if (error) {
    console.error("form details wrong");
    return res.status(400).json({
      message: "Bad request",
      error: error.message,
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    console.error("user not found");
    return res.status(404).json({
      message: "User not found",
    });
  }

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
      console.error("invalid pin");
      return res.status(403).json({
        message: "Invalid transaction pin",
      });
    }
    if (user.balance < amountInKobo) {
      console.error("insufficient funds");
      return res.status(400).json({
        message: "purchase failed",
        error: "Insufficient balance",
      });
    }

    const appState = "testing";

    if (appState === "testing") {
      const dudTransaction = await Transaction.create({
        amount: amountInKobo,
        phoneNumber,
        network,
        userId,
        transactionType: "airtime",
        credit: false,
      });

      return res.json({
        message: "Purchase successful",
        data: dudTransaction,
      });
    }

    //call the airtime api (blochq)
    const response = await buyAirtimeFromBloc(
      amountInKobo,
      phoneNumber,
      network
    );

    if (!response.success) {
      console.error("purchase failed from bloc");
      console.error(response);
      return res.status(400).json(response);
    }

    const { status, reference } = response.data;

    if (status !== "successful") {
      console.error("Airtime purchase not successful");
      return res.status(400).json({
        message: "Airtime purchase not successful",
        data: reference,
      });
    }
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
export async function getBalance(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No token found",
        error: "Unauthorised",
      });
    }
    const userId = req.user;

    const balance = await calculateBalance(userId);

    return res.json({
      message: "User balance",
      data: balance,
    });
  } catch (error: any) {
    console.error("Error calculating balance:", error);
    res
      .status(500)
      .json({ message: "Error calculating balance", error: error.message });
  }
}

export async function fundAccount(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No token provided",
        error: "Unauthorised",
      });
    }
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "Cannot process transaction",
        error: "User not found",
      });
    }

    const { reference } = req.body;
    const Authorization = `Bearer ${ps_secret}`;

    const processedFund = await Transaction.findOne({ reference });
    if (processedFund) {
      return res.status(409).json({
        message: "Stale transaction",
        error: "This transaction has been processed already",
      });
    }
    axios
      .get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization,
        },
      })
      .then(async (response) => {
        if (response.data.status) {
          const creditAmount = response.data.data.amount;
          const funds = new Transaction({
            amount: creditAmount,
            reference,
            bankName: "Decagon",
            accountName: "Monie-Paddy",
            credit: true,
            userId: req.user,
            transactionType: "fund wallet",
          });
          funds.save();
          return res.json({
            message: "Success",
            data: creditAmount,
          });
        }
      })
      .catch((error) => {
        console.error(`Error funding ${user.email} wallet:`, error.message);
        return res.status(500).json({
          message: "Transaction failed",
          error: "Could not confirm transaction",
        });
      });
  } catch (err: any) {
    console.error("Internal server error: ", err.message);
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
}

export async function bankTransfer(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No token provided",
        error: "Unauthorised",
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "Cannot process transaction",
        error: "User not found",
      });
    }

    const { error } = validBankTransfer.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Transaction failed",
        error: error.message,
      });
    }
    const { amount, bankName, accountName, accountNumber, note, pin } =
      req.body;
    if (!user.transactionPin) {
      return res.status(403).json({
        message: "Transaction failed",
        error: "Invalid credentials",
      });
    }
    const validPin = Bcrypt.compareSync(pin, user.transactionPin);
    if (!validPin) {
      return res.status(403).json({
        message: "Transaction failed",
        error: "Invalid credentials",
      });
    }

    const balance = await calculateBalance(req.user);

    if (balance < amount) {
      return res.status(409).json({
        message: "Transaction failed",
        error: "Insufficient funds",
      });
    }

    const transfer = await Transaction.create({
      userId: req.user,
      amount,
      accountName,
      accountNumber,
      bankName,
      transactionType: "transfer",
      credit: false,
      note,
    });

    return res.json({
      message: "Transfer successful",
      data: transfer,
    });
  } catch (err: any) {
    console.error("Internal server error: ", err.message);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}
export async function getTransactions(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'No token provided',
        error: 'Unauthorised',
      });
    }
    const { search = '', filter = '', page = 1, pageSize = 10 } = req.query;
    let query: any = { userId: req.user };
    if (search) {
      query.$or = [
        { transactionType: { $regex: search as string, $options: 'i' } },
        { accountName: { $regex: search as string, $options: 'i' } },
        { accountNumber: { $regex: search as string, $options: 'i' } },
        { bankName: { $regex: search as string, $options: 'i' } },
        { phoneNumber: { $regex: search as string, $options: 'i' } },
        { network: { $regex: search as string, $options: 'i' } },
        { dataPlan: { $regex: search as string, $options: 'i' } },
        { electricityMeterNo: { $regex: search as string, $options: 'i' } },
        { note: { $regex: search as string, $options: 'i' } },
      ];
    }
    const sort = filter === 'oldest' ? 1 : -1;
    if (filter === 'credit') {
      query.credit = true;
    }
    if (filter === 'debit') {
      query.credit = false;
    }

    const skip = (Number(page) - 1) * Number(pageSize);

    // console.log('Query:', query);

    const transactions = await Transaction.find(query)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(Number(pageSize));

    const total = await Transaction.countDocuments(query);
    // console.log('Transactions:', transactions);

    return res.json({
      message: 'Transactions',
      data: transactions,
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      totalPages: Math.ceil(total / Number(pageSize)),
    });
  } catch (err: any) {
    console.error('Internal server error: ', err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

// export async function sendMoney(req: Request, res: Response) {
//   const senderId = req.user;

//   const sender = await User.findById(senderId);

//   if (!sender) {
//     return res.status(404).json({
//       message: 'Sender not found',
//     });
//   }

//   const {
//     amount,
//     receiverUserId,
//     note,
//     transactionPin,

//   } = req.body;

//   try {
//     const userTransactionPin = sender.transactionPin;
//     if (!transactionPin || !userTransactionPin || !Bcrypt.compareSync(transactionPin, userTransactionPin)) {
//       return res.status(400).json({
//         message: 'Invalid transaction pin',
//       });
//     }

//     if (sender.balance < amount) {
//       return res.status(400).json({
//         message: 'Insufficient balance',
//       });
//     }

//     const receiver = await User.findById(receiverUserId);

//     if (!receiver) {
//       return res.status(404).json({
//         message: 'Receiver not found',
//       });
//     }

//     const transaction = new Transaction({
//       amount,
//       userId: senderId,
//       receiver,
//       note,
//       transactionType: 'send-money',
//     });
//     await transaction.save();

//     // Update sender's and receiver's balances
//     sender.balance -= amount;
//     receiver.balance += amount;

//     await sender.save();
//     await receiver.save();

//     res.json({
//       message: 'Money sent successfully',
//       data: transaction,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// }
