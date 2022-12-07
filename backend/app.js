const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const passport = require("./utils/passport");

//Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const homePageRoute = require("./routes/homePageRoute");
const likeRoute = require("./routes/likeRoute");

const PORT = process.env.PORT || 3000;

app.use(express.static("uploads"));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
//app.use("/comment", commentRoute);

app.use(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  commentRoute
);
app.use("/home", homePageRoute);
app.use("/like", passport.authenticate("jwt", { session: false }), likeRoute);
// passport.authenticate("jwt", { session: false }),

//It redirects from http to https on server
/* app.use(function (req, res, next) {
  if (process.env.NODE_ENV != "development" && !req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
}); */

app.listen(PORT, () => {
  console.log("App is listening at port: ", PORT);
});
