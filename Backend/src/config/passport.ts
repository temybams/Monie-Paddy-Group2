import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import passport from "passport";

config();

const User: {
  email: string | undefined;
  googleId: string;
  fullname: string | undefined;
}[] = [
  {
    email: "jite@mail.com",
    googleId: "1234567890",
    fullname: "jite kob",
  },
];
export default function passportSetup() {
  try {
    const callbackURL =
      process.env.NODE_ENV === "development"
        ? process.env.GOOGLE_REDIRECT_URL_DEV
        : process.env.GOOGLE_REDIRECT_URL;

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
        },
        async function (_accessToken, _refreshToken, profile, done) {
          //extract info from google profile

          const { sub, name, email } = profile._json;

          //check if user already exits in db with the givn profile

          //   let user = await User.findOne({ googleId: sub });
          let user = User.find((i) => i.email === email);
          if (user) {
            return done(null, user);
          }

          //create an account for the user with info from google profile

          const content = {
            email,
            googleId: sub,
            fullname: name,
          };

          User.push(content);
          //   user = new User(content);
          //   await user.save();
          return done(null, user);
        }
      )
    );

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      //   User.findbyId(id).then((user) => {
      const user = User.find((i) => i.googleId === id);
      done(null, user);
      //   });
    });

    console.log("passport setup done");
  } catch (error: any) {
    console.log(`Error setting up passport ${error.message}`);
  }
}
