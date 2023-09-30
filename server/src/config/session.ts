import express, { NextFunction, Request, Response } from "express";
import { app } from "../server"

const session = require("express-session");
const MongoStore = require("connect-mongo"); // Package documentation - https://www.npmjs.com/package/connect-mongo
const passport = require("passport");

/* 

https://stackoverflow.com/questions/66388523/error-cannot-init-client-mongo-connect-express-session

Creating a new connection as I do below is unoptimal, but I can't get anything else to work.

*/

const options = {
  mongoUrl: process.env.MONGODB_KEY_DEV,
  collection: "sessions",
  //autoRemove: "native", // Default
  //touchAfter: 24 * 3600, // Lazy session update (24 hours, time period is in seconds)
};

/**
 * Initializes session auth middleware in the server with using express and passport
 * @param {json} opt - takes MongoStore options, you can see them here: https://www.npmjs.com/package/connect-mongo
 */
export function initPassportSession(opt: any = options) {
  console.log("+ Initializing passport session auth...");

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create(opt),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = {
  initPassportSession,
};