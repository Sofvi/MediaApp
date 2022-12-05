"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, logout, register } = require("../controllers/authController");
const { createUser } = require("../controllers/userController");

router.get("/logout", logout);
router.post("/login", login);
router.post(
  "/register",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .trim(),
  register
);
//router.post("/register", createUser);

module.exports = router;
