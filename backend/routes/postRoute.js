"use strict";
const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");
const {
  getPostById,
  createPost,
  getPosts,
  modifyPost,
  removePost,
  getPostComments,

  getPostLikes,
} = require("../controllers/postController");
const router = require("./authRoute");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  //console.log(file);
};
const upload = multer({ dest: "uploads/", fileFilter });

router.get("/:id", getPostById);
router.get("/", getPosts);

//*WHEN USING THE VALIDATORS

router.post(
  "/",
  upload.single("image"),
  body("description").isLength({ min: 10 }).trim().escape(),
  body("post_created").isDate(),
  body("location").isLength({ min: 3 }).trim().escape(),
  createPost
);

router.put(
  "/:id",
  body("description").isLength({ min: 3 }).trim().escape(),
  body("post_created").isDate(),
  body("location").isLength({ min: 3 }).trim().escape(),
  modifyPost
);
router.get("/:id/comment", getPostComments);

router.get("/:id/like", getPostLikes);
router.delete("/:id", removePost);

module.exports = router;
