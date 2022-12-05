const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getComments,
  getCommentById,
  createComment,
  modifyComment,
  removeComment,
} = require("../controllers/commentController");

router.get("/:id", getCommentById);
router.get("/", getComments);

router.post(
  "/",
  body("comment_date").isDate(),
  body("content").isLength({ min: 5 }).trim().escape(),
  createComment
);

router.put(
  "/:id",
  body("comment_date").isDate(),
  body("content").isLength({ min: 5 }).trim().escape(),
  modifyComment
);

router.delete("/:id", removeComment);

module.exports = router;
