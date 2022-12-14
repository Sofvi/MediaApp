"use strict";
const {
  getAllComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
} = require("../model/commentModel");

const getComments = async (req, res) => {
  const posts = await getAllComments(res);
  res.json(posts);
};
const getCommentById = async (req, res) => {
  console.log("post_id", req.params.id);
  const commentId = req.params.id;
  const comment = await getComment(commentId, res);
  //console.log(comment);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send("Errorr!!");
  }
};
const createComment = async (req, res) => {
  const newComment = req.body;
  newComment.user_id = req.user.id;
  //newComment.post_id = req.
  console.log("body: ", req.body);
  console.log("content", req.body.content);
  console.log("userId", req.user.id);
  console.log("postId", req.body.post_id);
  console.log("Creating a new comment:", newComment);
  const result = await addComment(newComment, res);
  res.status(201).json({ userId: result });
  //res.send("User added");
};
const modifyComment = async (req, res) => {
  const comment = req.body;
  console.log("Comment: ", comment);
  if (req.params.id) {
    comment.id = req.params.id;
  }

  const result = await editComment(comment, res);
  console.log(result);
  if (result.affectedRows > 0) {
    res.send("Comment modified!!");
  } else {
    res.sendStatus(502);
  }
};

const removeComment = async (req, res) => {
  console.log(req.params.id);
  const commentDelete = await deleteComment(req.params.id, res);
  if (commentDelete) {
    res.json({ message: "Comment deleted successfully!!" });
  } else res.sendStatus(501);
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  modifyComment,
  removeComment,
};
