"use strict";
const pool = require("../database/db-config");
const promisePool = pool.promise();

//get likes of a post
const getLikes = async (post_id) => {
  try {
    // const sql =
    // "SELECT userlike.post_id, COUNT(likes_num) FROM post INNER JOIN userlike ON post.id =userlike.post_id GROUP BY post_id ORDER BY COUNT(likes_num) DESC limit 3 ";

    const [result] = await promisePool.execute(
      "Select count(user_id) as likes from userlike where post_id = ?",
      [post_id]
    );
    return result[0];
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
  console.log(postId, userId);
  let isDuplicate = false;
  try {
    const [likeData] = await promisePool.execute(
      "select user_id, post_id from userlike "
      // [userId, postId, 1]
    );
    likeData.map((data) => {
      if (data.user_id == userId && data.post_id == postId) {
        isDuplicate = true;
        return;
      }
    });
    console.log(" Data of likedata: ", likeData, isDuplicate);
    if (isDuplicate) {
      const [deleteRow] = await promisePool.execute(
        "delete from userlike where user_id = ? and post_id = ?",
        [userId, postId]
      );
      console.log(deleteRow);
      return deleteRow;
    }
    const [insertLike] = await promisePool.execute(
      "INSERT INTO userlike (user_id, post_id, likes_num ) VALUES (?, ?, ?)",
      [userId, postId, 1]
    );
    console.log("Log mathi", insertLike);
    return insertLike;
  } catch (e) {
    console.error("Added like", e.message);
  }
};

const deleteLike = async (postId, userId) => {
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
