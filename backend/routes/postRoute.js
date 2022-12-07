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
<<<<<<< HEAD
=======
  getPostComments,

  getPostLikes,
>>>>>>> binod
} = require("../controllers/postController");
const router = require("./authRoute");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
<<<<<<< HEAD
  console.log(file);
=======
  //console.log(file);
>>>>>>> binod
};
const upload = multer({ dest: "uploads/", fileFilter });

router.get("/:id", getPostById);
router.get("/", getPosts);
<<<<<<< HEAD
//router.post("/", createPost);
//router.put("/>id", modifyPost);
=======
>>>>>>> binod

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
<<<<<<< HEAD
=======
router.get("/:id/comment", getPostComments);

router.get("/:id/like", getPostLikes);
>>>>>>> binod
router.delete("/:id", removePost);

module.exports = router;
