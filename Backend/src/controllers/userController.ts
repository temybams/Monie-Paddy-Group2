import { Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phoneNumber, bvn, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
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
      password: hashedPassword,
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
  } catch (error) {
    console.error("Error in Login ", error);
    return res.status(500).send("Internal server error");
  }
}
