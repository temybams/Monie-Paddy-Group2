import { boolean } from "joi";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface TransactionInstance extends Document {
  userId: string;
  amount: number;
  transactionType: string;
  note?: string;
  credit: boolean;
  reference?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  phoneNumber: string;
  network: string;
  status: string;
  credit: boolean;
  reference: string;
  status: string;
  dataPlan: string;
  electricityMeterNo: string;
}

const TransactionSchema = new Schema<TransactionInstance>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, required: true },
    note: { type: String, required: false },
    credit: { type: Boolean, required: true },
    reference: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    phoneNumber: { type: String },
    network: { type: String },
    dataPlan: { type: String },
    electricityMeterNo: { type: String },
  },
  { timestamps: true }
);

const Transaction: Model<TransactionInstance> =
  mongoose.model<TransactionInstance>("Transaction", TransactionSchema);

export default Transaction;
