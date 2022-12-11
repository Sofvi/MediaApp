const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");
const router = express.Router();
const {
  getUser,
  getUsers,
  checkToken,
  addProfilePic,
  modifyUser,
  createUser,
  getUsersPosts,
} = require("../controllers/userController");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  //console.log(file);
};
const upload = multer({ dest: "profilePics/", fileFilter });

router.get("/", getUsers);
router.get("/token", checkToken);

router.post(
  "/",
  
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .trim(),
  createUser
);

router.put(
  "/profile_pic",
  upload.single("profile_pic"),
  addProfilePic
);

router.get("/:id", getUser);
router.put(
  "/:id",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .trim(),
  modifyUser
);

//This end point will get all the posts of user with id
router.get("/:id/post", getUsersPosts);

module.exports = router;