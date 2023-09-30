/**
 * 
 *  Library for the basic functions needed to encrypt and decrypt passwords.
 * 
 */

import { Console } from "console";

const crypto = require("crypto");

export function genPassword(password: string) {
  var salt = crypto.randomBytes(32).toString("hex");
  var hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: hash,
  };
}

export function validPassword(password: string, hash: string, salt: any) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  console.log("validPassword() will return " + String(hash === hashVerify));
  return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;