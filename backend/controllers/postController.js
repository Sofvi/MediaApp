"use strict";
const {
  getPost,
  getAllPosts,
  editPost,
  addPost,
  deletePost,
  getAllCommentsForPost,
  getLikesForPost,
} = require("../model/postModel");
const { validationResult } = require("express-validator");
const { makeThumbnail, getCoordinates } = require("../utils/image");

//get all posts

const getPosts = async (req, res) => {
  const posts = await getAllPosts(res);
  posts.map((post) => {
    // convert birthdate date object to 'YYYY-MM-DD' string format
    post.post_created = post.post_created.toISOString().split("T")[0];
    return post;
  });
  res.json(posts);
};

//Get post by id
const getPostById = async (req, res) => {
  //console.log(req.body);
  const postId = req.params.id;
  console.log("The id for post: ", postId);
  const post = await getPost(postId, res);
  console.log(post);
  //If the post id is unavailable throws an error, the least usable id is 9
  if (post) {
    post.post_created = post.post_created.toISOString().split("T")[0];
    res.json(post);
  } else {
    res.status(404).send("Errorr in getting post!!");
  }
};
const createPost = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.file);
  if (!req.file) {
    res.status(400).json({ message: "file not found OR invalid file" });
  } else if (errors.isEmpty()) {
    const newPost = req.body;
    await makeThumbnail(req.file.path, req.file.filename);
    newPost.coords = JSON.stringify(await getCoordinates(req.file.path));

    console.log("Request user:", req.user.id);
    newPost.user_id = req.user.id;
    newPost.filename = req.file.filename;
    console.log(newPost.filename);

    //*Trying this way to avoid the object: null prototype
    //const post = JSON.parse(JSON.stringify(newPost));

    console.log("Creating a new post:", newPost);
    //console.log("Creating a new post:", post);
    const result = await addPost(newPost, req, res);
    res.status(201).json({ message: "post created ", userId: result });
  } else {
    console.log("validation errors", errors);
    res.status(400).json({ message: "Failed to post", errors: errors.array() });
  }
};
const modifyPost = async (req, res) => {
  const post = req.body;
  const user = req.user;
  console.log("Log for user", user);
  console.log("Posts: ", post);
  if (req.params.id) {
    post.id = req.params.id;
  }

  const result = await editPost(post, user, res);
  if (result.affectedRows > 0) {
    res.json({ message: "Post modified!!" });
  } else {
    res.sendStatus(502);
  }
};

const removePost = async (req, res) => {
  console.log(req.params.id);
  const postDelete = await deletePost(req.params.id, res);
  if (postDelete) {
    res.json({ message: "Post deleted successfully!!" });
  } else res.sendStatus(501);
};
const getPostComments = async (req, res) => {
  const id = req.params.id;
  const comments = await getAllCommentsForPost(id, res);

  if (comments) {
    res.json(comments);
  } else {
    res.status(404).send("Errorr in getting comments!!");
  }
};

const getPostLikes = async (req, res) => {
  const id = req.params.id;
  const likes = await getLikesForPost(id, res);

  if (likes) {
    res.json(likes);
  } else {
    res.status(404).send("Errorr in getting likes!!");
  }
};

module.exports = {
  getPostById,
  getPosts,
  createPost,
  modifyPost,
  removePost,
  getPostComments,
  getPostLikes,
};
