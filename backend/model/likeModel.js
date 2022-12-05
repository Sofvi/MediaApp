"use strict";
const pool = require("../database/db-config");
const promisePool = pool.promise();

//get likes of a post
const getLikes = async () => {
  try {
    const sql =
      "SELECT post.file, userlike.post_id, COUNT(likes_num) FROM post INNER JOIN user_like ON post.id =userlike.post_id GROUP BY post_id ORDER BY COUNT(likes_num) DESC limit 3 ";

    const [result] = await promisePool.execute(sql);

    return result;
  } catch (e) {
    console.log(e.message);
  }
};
const getLikesByPosts = async (post) => {
  try {
    const sql = "SELECT COUNT(likes_num) FROM userlike WHERE post_id = " + post;
    const [result] = await promisePool.execute(sql);
    console.log(result);
    return result[0];
  } catch (e) {
    console.log(e.message);
  }
};
const addLike = async (postId, userId) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO userlike (user_id, post_id) VALUES (?, ?)",
      [userId, postId]
    );
    return rows;
  } catch (e) {
    console.error("Added like", e.message);
  }
};
const deleteLike = async (postId, userId, next) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM userlike WHERE post_id = ? AND user_id = ?",
      [postId, userId]
    );
    return rows;
  } catch (e) {
    console.error("Deleted like", e.message);
  }
};

module.exports = {
  getLikes,
  getLikesByPosts,
  addLike,
  deleteLike,
};
