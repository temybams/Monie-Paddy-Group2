import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import passport from "passport";
import User from "../models/userModel";

config();

export default function passportSetup() {
  try {
    const callbackURL = process.env.GOOGLE_REDIRECT_URL;

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL,
        },
        async function (_accessToken, _refreshToken, profile, done) {
          //extract info from google profile

          const { sub, name, email } = profile._json;

          //check if user already exits in db with the givn profile

          let user = await User.findOne({ email });
          if (user) {
            return done(null, user);
          }

          //create an account for the user with info from google profile

          const userDetails = {
            email,
            ssoId: sub,
            fullName: name,
            ssoProvider: "Google",
            verifiedEmail: true,
          };

          user = new User(userDetails);
          await user.save();
          return done(null, user);
        }
      )
    );

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        done(null, user);
      });
    });

    console.log("passport setup done");
  } catch (error: any) {
    console.log(`Error setting up passport ${error.message}`);
  }
}
