import mongoose from "mongoose";

export interface UserInstance {
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  password: string;
  transactionPinSet?: boolean;
  transactionPin?: string;
  _id: string
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    bvn: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactionPinSet: {
      type: Boolean,
      default: false,
    },
    transactionPin: {
      type: String,
      required: false,
      length: 4,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInstance>("User", userSchema);

export default User;
