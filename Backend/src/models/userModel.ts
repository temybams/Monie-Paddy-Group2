import mongoose from "mongoose";

export interface UserInstance extends mongoose.Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  password?: string;
  ssoId?: string;
  ssoProvider?: string;
  verifiedEmail: boolean;
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
      minlength: 10,
      maxlength: 11,
    },
    bvn: {
      type: String,
      minlength: 10,
      maxlength: 11,
    },
    password: {
      type: String,
      minlength: 6,
    },
    ssoId: {
      type: String,
      required: true,
    },
    ssoProvider: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInstance>("User", userSchema);

export default User;
