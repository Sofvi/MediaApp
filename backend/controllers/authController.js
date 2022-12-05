"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { addUser } = require("../model/userModel");
require("dotenv").config();

const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      // do not include password in token/user object when sending to client
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};

const register = async (req, res) => {
  console.log("Creating a new user:", req.body);
  const newUser = req.body;
  if (!newUser.role) {
    // default user role (normal user)
    newUser.role = 1;
  }
  const errors = validationResult(req);
  console.log("validation errors", errors);
  if (errors.isEmpty()) {
    // Hash the input password and replace the clear text passwd with the hashed one
    // before adding to the db
    const salt = await bcrypt.genSalt();
    const paswordHash = await bcrypt.hash(newUser.password, salt);
    newUser.password = paswordHash;
    const result = await addUser(newUser, res);
    res.status(201).json({ message: "user created", userId: result });
  } else {
    res.status(400).json({
      message: "user creation failed",
      errors: errors.array(),
    });
  }
};

const logout = (req, res) => {
  console.log("some user logged out");
  res.json({ message: "logged out" });
};

module.exports = {
  login,
  logout,
  register,
};
