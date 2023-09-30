/**
 * 
 *  Personal library for user auth verification
 * 
 * 
 */

import { Request, Response, NextFunction } from "express";
import { UserRole, User} from "../models/User";
import { genPassword } from "./passwordUtils";

//const User = require('../models/User')

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user.role == UserRole.ADMIN) {
    next();
  } else {
    res
      .status(401)
      .json({
        msg: "You are not authorized to view this resource because you are not an admin.",
      });
  }
};

export const registerUser = (req:any, res: Response) => {

  console.log("username: ", req.body.username) // DEBUG
  console.log('email:', req.body.email); // DEBUG
  console.log('password:', req.body.password); // DEBUG
  
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    hash: hash,
    salt: salt,
    role: UserRole.USER,
  });

  newUser.save()
        .then((newUser:any) => {
            console.log("New user registered: " + String(newUser));
        });
  
  return newUser;
}

module.exports = {
  isAuth,
  isAdmin,
  registerUser
}