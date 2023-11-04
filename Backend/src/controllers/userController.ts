import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/utils";
import { signupValidation, options } from "../utils/signupValidation";

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request data
    const { error, value } = signupValidation.validate(req.body, options);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, email, phoneNumber, bvn, password } = value;
    // const hashedPassword = bcryptjs.hashSync(password, 10);

    // Check if a user with the same email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create a new user
    user = await User.create({
      fullName,
      email,
      phoneNumber,
      bvn,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

export async function login(req: Request, res: Response) {
  try {
    if (req.url.startsWith("/google/redirect?code=")) {
      //google login
      const token = generateToken(req.user, res);
      const clientUrl = process.env.CLIENT_URL;
      return res.redirect(`${clientUrl}/sso?token=${token}`);
    }

    //manual login
    const { email, password } = req.body;
    // Check if a user with the same email already exists
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide an email and password',
      });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    console.log(password)
    console.log(user.password)
        // console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    const token = generateToken(user, res);
    return res.status(200).json({
      message: 'User logged in successfully',
      token,
      user,
    });
  } catch (error) {
    console.error("Error in Login ", error);
    return res.status(500).send("Internal server error");
  }
}

export async function createPin(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { transactionPin, pinConfirmation } = req.body;

    transactionPin = transactionPin.toString();
    pinConfirmation = pinConfirmation.toString();

    if (transactionPin.length !== 4 || !/^\d+$/.test(transactionPin)) {
      return res.status(400).send("Invalid transaction pin");
    }

    if (transactionPin !== pinConfirmation) {
      return res.status(400).send("Password confirmation does not match");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPin = await bcryptjs.hash(transactionPin, salt);

    const user = await User.findByIdAndUpdate(
      id,
      { transactionPin: hashedPin, transactionPinSet: true },
      { new: true }
    );
    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send("Internal server error");
  }
}
