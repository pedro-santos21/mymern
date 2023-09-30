const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pwdUtils = require("../lib/passwordUtils");
import { debug } from "console";
import { UserRole, User} from "../models/User";

console.log("+ Passport is being setup...");

const verifyCallback = (req:any, username:string, password: string, done: any) => {
    console.log('request:', req.body); // DEBUG
    console.log('username:', username); // DEBUG
    console.log('password:', password); // DEBUG
    console.log('done:', done); // DEBUG

  User.findOne({ $or: [{ username: req.body.email }, { email: req.body.email }] })
    .then((user: any) => {
      if (!user) {
        return done(null, false);
      }

      var isValid = pwdUtils.validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err: any) => {
        //console.log(err);
        done(err);
    });
};

const customFields = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};

const strategy = new LocalStrategy(customFields, verifyCallback);
console.log('strategy:', strategy); // DEBUG
passport.use(strategy);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((userId: string, done: any) => {
  User.findById(userId)
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => done(err));
});