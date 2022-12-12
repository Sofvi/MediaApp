"use strict";
const express = require("express");
const router = express.Router();

const {
  getAllLike,
  getPostsLike,
  addLikeToPost,
  deleteLikeToPost,
} = require("../controllers/likeController");
const { get } = require("./userRoute");

//router.get("/", getAllLike);
router.get("/:id/like", getPostsLike);
router.post("/:id/like", addLikeToPost);
router.delete("/:id/like", deleteLikeToPost);

module.exports = router;
