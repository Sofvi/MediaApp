"use strict";
const { getLikes, getLikesByPosts } = require("../model/likeModel");

const getAllLike = async (req, res) => {
  const likes = await getLikes();
  if (likes) {
    res.json(likes);
  } else {
    res.status(404).send("Errorr!!");
  }
};

const getPostsLike = async (req, res) => {
  const postId = req.params.id;
  const postLikes = await getLikesByPosts(postId);
  console.log(postLikes);
  if (postLikes) {
    res.json(postLikes);
  } else {
    res.status(404).send("Errorr!!");
  }
};

module.exports = {
  getAllLike,
  getPostsLike,
};
