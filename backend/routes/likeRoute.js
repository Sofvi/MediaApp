"use strict";
const express = require("express");
const router = express.Router();

const { getAllLike, getPostsLike } = require("../controllers/likeController");
const { get } = require("./userRoute");

router.get("/", getAllLike);
router.get("/:id", getPostsLike);
module.exports = router;
