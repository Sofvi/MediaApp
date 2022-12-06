"use strict";
const pool = require("../database/db-config");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const sql = "SELECT username,email FROM user";
    const [rows] = await promisePool.execute(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getUserById = async (id, res) => {
  try {
    const sql = "SELECT id, username, email FROM user WHERE id=" + id;
    const [rows] = await promisePool.execute(sql);
    console.log(rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getUserLogin = async (user) => {
  try {
    console.log("getUserLogin(): ", user);
    const sql = "SELECT * FROM user WHERE email = ?;";
    const [rows] = await promisePool.execute(sql, user);
    return rows;
  } catch (e) {
    console.log("error", e.message);
    res.status(500).send(e.message);
  }
};

const addUser = async (user, res) => {
  try {
    const { username, email, password } = user;
    //console.log("user:", user);
    const sql = "INSERT INTO user VALUE (null, ?, ?, ?,1)";
    const values = [username, email, password];
    const [result] = await promisePool.execute(sql, values);
    result;
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const modifyUser = async (user, res) => {
  try {
    console.log("Modify user:", user);
    const { username, email, password, type, id } = user;
    const sql =
      "UPDATE user SET username = ?, email = ?, password = ?, type = ? WHERE id = ? ";
    const values = [username, email, password, type, id];
    const [result] = await promisePool.execute(sql, values);
    console.log("Results: ", result);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};
const deleteUser = async (userId, type) => {
  // only admin can delete user, the type of admin is 0
  if (type === 0) {
    try {
      const [rows] = await promisePool.execute(
        "DELETE FROM user WHERE id = ?",
        [userId]
      );
      return rows;
    } catch (e) {
      console.error("Deleted user", e.message);
    }
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserLogin,
  addUser,
  modifyUser,
  deleteUser,
};
