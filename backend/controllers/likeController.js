"use strict";
const {
  getLikes,
  getLikesByPosts,
  addLike,
  deleteLike,
} = require("../model/likeModel");

const getAllLike = async (req, res) => {
  const response = await getLikes(req.params.id);
  //console.log("like", response);
  if (response) {
    res.json(response);
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

const addLikeToPost = async (req, res) => {
  const postId = req.params.id;
  const user = req.user.id;
  const like = await addLike(postId, user);
  if (like) {
    res.json(like);
  } else {
    res.status(404).send("Errorr in adding likes");
  }
};
const deleteLikeToPost = async (req, res) => {
  const post = req.params.id;
  const user = req.params.userId;
  const deleteLike = await deleteLike(post, user);
  if (deleteLike) {
    res.json(deleteLike);
  } else {
    res.status(404).send("Errorr in adding likes");
  }
};

module.exports = {
  getAllLike,
  getPostsLike,
  addLikeToPost,
  deleteLikeToPost,
};
