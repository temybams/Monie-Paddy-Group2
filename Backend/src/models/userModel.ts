
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber?: string;
  bvn?: string;
  password: string;
  transactionPinSet?: boolean;
  transactionPin?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  _id: string
}

const userSchema = new mongoose.Schema<IUser>({
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
});

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

// Compare entered password with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES || '1h',
  });
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;

