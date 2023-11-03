import express from "express";
import * as user from "../controllers/userController";
import passport from "passport";

const router = express.Router();

//auth

router.post("/login", user.login);
router.post("/signup", user.signup)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get("/google/redirect", passport.authenticate("google"), user.login);

export default router;
