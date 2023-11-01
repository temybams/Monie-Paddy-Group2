import { Request, Response } from 'express';
import User from '../models/userModel';
import bcryptjs from 'bcryptjs';
import { signupValidation, options } from '../utils/signupValidation';

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request data
    const { error, value } = signupValidation.validate(req.body, options);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, email, phoneNumber, bvn, password } = value;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Check if a user with the same email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    // Create a new user
    user = await User.create({ fullName, email, phoneNumber, bvn, password: hashedPassword });

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
