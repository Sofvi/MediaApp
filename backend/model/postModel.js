"use strict";
const pool = require("../database/db-config");
const promisePool = pool.promise();

const getAllPosts = async (postId, res) => {
  try {
    const sql = "SELECT * FROM post";

    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getPost = async (id, res) => {
  try {
    const sql =
      "SELECT id, filename, description, post_created, location, (SELECT count(likes_num) from userlike WHERE userlike.post_id = post.id) as num_likes ,(SELECT count(*) from comment WHERE comment.post_id = post.id) as num_comments, (SELECT user.username from user WHERE user.id = post.user_id) as owner FROM post WHERE id = ?";
    const [rows] = await promisePool.query(sql, id);
    console.log(rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getAllCommentsForPost = async (id, res) => {
  try {
    const sql =
      "SELECT comment.user_id, comment.id, user.username, comment.content, comment.comment_date, comment.edited_date FROM comment INNER JOIN user ON user.id = comment.user_id WHERE post_id = ?";
    const [rows] = await promisePool.query(sql, id);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getLikesForPost = async (id, res) => {
  try {
    const sql = "SELECT COUNT(*) as num_likes FROM userlike WHERE post_id = ?";
    const [rows] = await promisePool.query(sql, id);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addPost = async (user_post, res) => {
  try {
    let { user_id, filename, description, post_created, location, coords } =
      user_post;

    //Database does not accept the undefined value
    if (coords == undefined) {
      coords = null;
    }
    const sql =
      "INSERT INTO post(user_id,filename, description,post_created,location, coords) VALUE (?,?,?,?,?,?)";
    const values = [
      user_id,
      filename,
      description,
      post_created,
      location,
      coords,
    ];
    console.log("Values inserted", values);
    const [result] = await promisePool.execute(sql, values);
    //console.log(result.insertId);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const editPost = async (post, res) => {
  try {
    console.log("Modify post:", post);
    const { description, post_created, location, id } = post;
    const sql =
      "UPDATE post SET description = ?, post_created = ?, file_location = ? WHERE id = ? ";
    const values = [description, post_created, location, id];
    const [result] = await promisePool.execute(sql, values);
    console.log("Result", result);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};

const deletePost = async (id, res) => {
  try {
    let sql = "DELETE FROM post where id = " + id;
    const [result] = await promisePool.execute(sql);
    console.log("Result: ", result);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};
//const getRandomPost = async();

module.exports = {
  getPost,
  getAllPosts,
  addPost,
  editPost,
  deletePost,
  getAllCommentsForPost,
  getLikesForPost,
};
