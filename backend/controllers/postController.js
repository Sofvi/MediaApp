"use strict";
const {
  getPost,
  getAllPosts,
  editPost,
  addPost,
  deletePost,
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
  console.log(req.params.id);
  //console.log(req.body);
  const postId = req.params.id;
  const post = await getPost(postId, res);
  console.log(post);

  if (post) {
    post.post_created = post.post_created.toISOString().split("T")[0];
    res.json(post);
  } else {
    res.status(404).send("Errorr in getting post!!");
  }
};
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    res.status(400).json({ message: "file not found OR invalid file" });
  } else if (errors.isEmpty()) {
    const newPost = req.body;
    await makeThumbnail(req.file.path, req.file.filename);
    newPost.coords = JSON.stringify(await getCoordinates(req.file.path));

    newPost.filename = req.file.filename;
    console.log("Creating a new post:", newPost);
    const result = await addPost(newPost, res);
    res.status(201).json({ message: "post created ", userId: result });
  } else {
    console.log("validation errors".errors);
    res.status(400).json({ message: "Failed to post", errors: errors.array() });
  }

  /*  const newPost = req.body;
  console.log("Creating a new post:", newPost);
  const result = await addPost(newPost, res);
  res.status(201).json({ userId: result });
  //res.send("User added"); */
};
const modifyPost = async (req, res) => {
  const post = req.body;
  console.log("Posts: ", post);
  if (req.params.id) {
    post.id = req.params.id;
  }

  const result = await editPost(post, res);
  console.log(result);
  if (result.affectedRows > 0) {
    res.send("Post modified!!");
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

module.exports = {
  getPostById,
  getPosts,
  createPost,
  modifyPost,
  removePost,
};
