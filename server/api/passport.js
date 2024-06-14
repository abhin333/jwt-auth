import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      // Assuming userProfile is defined elsewhere or should be handled in this scope
      const userProfile = profile;
      return done(null, userProfile);
  }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
