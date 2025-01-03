import {} from 'dotenv/config';
import User from '../models/User.js';
import { checkHash } from '../utils/hashUtils.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleStrategy from "passport-google-oauth20";

const setupPassportStrategy = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
  }, 
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isAuth = await checkHash(password, user.passwordHash);
      if (isAuth) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (error) {
      return done(error);
    }
  }));
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_URI,
        userProfileURL: process.env.GOOGLE_PROFILE_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
          const email = profile.emails[0].value;
          const user = await User.findOne({where:{email:email}});
          if (!user) {
            const newUser = await User.create({
                username:profile.displayName,
                email:email,
                passwordHash:'google',
                user_img: profile.photos[0].value
            });
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  // Serialize user into the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export { setupPassportStrategy, passport };
