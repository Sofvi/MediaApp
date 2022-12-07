"use strict";
const express = require("express");
const router = express.Router();
const { getRandomPosts } = require("../controllers/homePagecontroller");

router.get("/", getRandomPosts);

module.exports = router;
