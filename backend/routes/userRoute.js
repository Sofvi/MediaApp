const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getUser,
  getUsers,
  checkToken,
  modifyUser,
  createUser,
  getUsersPosts,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/token", checkToken);

router.post(
  "/",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .trim(),
  createUser
);

router.get("/:id", getUser);
router.put(
  "/:id",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .trim(),
  modifyUser
);

//This end point will get all the posts of user with id
router.get("/:id/post", getUsersPosts);

module.exports = router;