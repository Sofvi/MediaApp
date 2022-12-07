const userModel = require("../model/userModel");
const { validationResult } = require("express-validator");

const getUsers = async (req, res) => {
  const users = await userModel.getAllUsers(res);
  res.json(users);
};
const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.getUserById(id, res);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Errorr in getting user!!");
  }
};

const createUser = async (req, res) => {
  console.log("Creating a new user:", req.body);
  const newUser = req.body;

  const errors = validationResult(req);
  console.log("validation error", errors);

  if (errors.isEmpty()) {
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({ userId: result });
  } else {
    res.status(400).json({
      message: "user creation failed",
      errors: errors.array(),
    });
  }

  //res.send("User added");
};
const modifyUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  if (req.params.id) {
    user.id = req.params.id;
  }
  const result = await userModel.modifyUser(user, res);
  console.log(result);
  if (result.affectedRows > 0) {
    res.send("User modified!!");
  } else {
    res.sendStatus(502);
  }
};
const getUsersPosts = async (req, res) => {
  const id = req.params.id;
  const userPosts = await userModel.getPostsOfUser(id);

  if (userPosts) {
    res.json({ userPosts });
  } else {
    res.status(404).send("Errorr in getting posts!!");
  }
};

const checkToken = (req, res) => {
  res.json({ user: req.user });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  modifyUser,
  getUsersPosts,
  checkToken,
};
